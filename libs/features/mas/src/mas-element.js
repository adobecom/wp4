import {
    CLASS_NAME_FAILED,
    CLASS_NAME_PENDING,
    CLASS_NAME_RESOLVED,
    EVENT_TYPE_FAILED,
    EVENT_TYPE_PENDING,
    EVENT_TYPE_RESOLVED,
    STATE_FAILED,
    STATE_PENDING,
    STATE_RESOLVED,
} from './constants.js';
import { ignore } from './external.js';
import { discoverService, setImmediate, useService } from './utilities.js';
import { Log } from './log.js';

const MasElementConstants = {
    CLASS_NAME_FAILED,
    CLASS_NAME_PENDING,
    CLASS_NAME_RESOLVED,
    EVENT_TYPE_FAILED,
    EVENT_TYPE_PENDING,
    EVENT_TYPE_RESOLVED,
    STATE_FAILED,
    STATE_PENDING,
    STATE_RESOLVED,
};

const StateClassName = {
    [STATE_FAILED]: CLASS_NAME_FAILED,
    [STATE_PENDING]: CLASS_NAME_PENDING,
    [STATE_RESOLVED]: CLASS_NAME_RESOLVED,
};

const StateEventType = {
    [STATE_FAILED]: EVENT_TYPE_FAILED,
    [STATE_PENDING]: EVENT_TYPE_PENDING,
    [STATE_RESOLVED]: EVENT_TYPE_RESOLVED,
};

export class MasElement {
    changes = new Map();
    connected = false;
    dispose = ignore;
    error = undefined;
    log = undefined;
    options = undefined;
    promises = [];
    state =STATE_PENDING;
    timer = null;
    value = undefined;
    version = 0;

    wrapperElement;
    
    constructor(wrapperElement) {
      this.wrapperElement = wrapperElement;
    }

    update() {      
      [STATE_FAILED, STATE_PENDING, STATE_RESOLVED].forEach((state) => {
          this.wrapperElement.classList.toggle(StateClassName[state], state === this.state);
      });
    }

    notify() {
      if (this.state === STATE_RESOLVED || this.state === STATE_FAILED) {          
          if (this.state === STATE_RESOLVED) {
              this.promises.forEach(({ resolve }) => resolve(this.wrapperElement));
          } else if (this.state === STATE_FAILED) {
              this.promises.forEach(({ reject }) => reject(this.error));
          }
          this.promises = [];
      }
      this.wrapperElement.dispatchEvent(
          new CustomEvent(StateEventType[this.state], { bubbles: true }),
      );
    }

    /**
     * Adds name/value of the updated attribute to the `changes` map,
     * requests placeholder update.
     */
    attributeChangedCallback(name, _, value) {      
        this.changes.set(name, value);
        // Initiate update of the placeholder
        this.requestUpdate();
    }

    /**
     * Triggers when this component is connected to DOM.
     * Subscribes to the `ready` event of the commerce service,
     * requests placeholder update.
     */
    connectedCallback() {
        this.dispose = discoverService(() => this.requestUpdate(true));
    }

    /**
     * Triggers when this component is disconnected from DOM.
     * Runs and then erases all disposers.
     */
    disconnectedCallback() {
        if (this.connected) {
            this.connected = false;
            this.log?.debug('Disconnected:', { element: this.wrapperElement });
        }
        this.dispose();
        this.dispose = ignore;
    };

    /**
     * Returns a promise resolving to this placeholder
     * when its value is resolved or rejected.
     * If placeholder is not pending for completion of an async operation
     * the returned promise is already resolved or rejected.
     */
    onceSettled() {
        const { error, promises, state } = this;
        if (STATE_RESOLVED === state) return Promise.resolve(this.wrapperElement);
        if (STATE_FAILED === state) return Promise.reject(error);
        return new Promise((resolve, reject) => {
            promises.push({ resolve, reject });
        });
    };

    /**
     * Sets component state to "RESOLVED".
     * Updates its class list and stored value, notifies observers and fires "RESOLVED" event.
     */
    toggleResolved(version, value, options) {
        // skip obsolete asyncs
        if (version !== this.version) return false;
        if (options !== undefined) this.options = options;
        this.state = STATE_RESOLVED;
        this.value = value;
        this.update();
        this.log?.debug('Resolved:', { element: this.wrapperElement, value });
        // Allow calling code to perform sync updates of this element
        // before notifying observers about state change
        setImmediate(() => this.notify());
        return true;
    };

    /**
     * Sets component state to "FAILED".
     * Updates its class list and stored error, notifies observers and fires "FAILED" event.
     */
    toggleFailed(version, error, options) {
        // Skip obsolete asyncs
        if (version !== this.version) return false;
        if (options !== undefined) this.options = options;
        this.error = error;
        this.state = STATE_FAILED;
        this.update();
        this.log?.error('Failed:', { element: this.wrapperElement, error });
        setImmediate(() => this.notify());
        return true;
    }

    /**
     * Sets component state to "PENDING".
     * Increments its version, updates CSS classes, notifies observers and fires "PENDING" event.
     */
    togglePending(options) {
        this.version++;
        if (options) this.options = options;
        this.state = STATE_PENDING;
        this.update();
        setImmediate(() => this.notify());
        return this.version;
    }

    /**
     * Queues task to update this component.
     * Skips rendering if update is not forced and no changes were accumulated since the previous update.
     * Calls `render` method to perform the update.
     * Restores previous state of the component if the `render` method returned `false`.
     */
    requestUpdate(force = false) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (!this.wrapperElement.isConnected || !useService()) return;
        // Batch consecutive updates
        if (this.timer) return;
        const log = Log.module('mas-element');
        // Save current state to restore it if needed
        const { error, options, state, value, version } = this;
        // Inform `onceSettled` that `render` can follow soon
        this.state = STATE_PENDING;
        this.timer = setImmediate(async () => {
            this.timer = null;
            let changes = null;
            // Gather list of changes triggered the update
            if (this.changes.size) {
                changes = Object.fromEntries(this.changes.entries());
                this.changes.clear();
            }
            // Trottle connected-disconnected series of events
            // when placeholder is actively manipulated by a higher component
            if (this.connected) {
                this.log?.debug('Updated:', { element: this.wrapperElement, changes });
            } else {
                this.connected = true;
                this.log?.debug('Connected:', { element: this.wrapperElement, changes });
            }
            if (changes || force) {
                try {
                    const result = await this.wrapperElement.render?.();
                    // Restore previous state if `render` has returned `false`
                    if (
                        result === false &&
                        this.state === STATE_PENDING &&
                        this.version === version
                    ) {
                        this.state = state;
                        this.error = error;
                        this.value = value;
                        // Update CSS and notify observers/listeners
                        this.update();
                        this.notify();
                    }
                } catch (error) {
                    log.error(`Failed to render mas-element: `, error);
                    this.toggleFailed(this.version, error, options);
                }
            }
        });
    }
};

/**
 * Deletes properties of `dataset` object that coerce to common defaults in a DOM dataset:
 *  - null, undefined;
 *  - empty strings and arrays;
 * Returns `dataset` object.
 */
function cleanupDataset(dataset = {}) {
    Object.entries(dataset).forEach(([key, value]) => {
        const remove = value == null || value === '' || value?.length === 0;
        if (remove) delete dataset[key];
    });
    return dataset;
}

/**
 * Returns custom HTML element constructed by the `Class` argument.
 * Populates element dataset from `dataset` object,
 * omits empty values (false, '', null, undefined).
 */
export function createMasElement(Class, dataset = {}) {
    const { tag, is } = Class;
    // Create custom DOM element
    const element = document.createElement(tag, { is });
    element.setAttribute('is', is);
    Object.assign(element.dataset, cleanupDataset(dataset));
    return element;
}

/**
 * Updates element dataset from `dataset` object,
 * omits empty values (false, '', null, undefined).
 * @param {HTMLElement} element
 * @param {Record<string, any>} dataset
 */
export function updateMasElement(element, dataset = {}) {
    if (element instanceof HTMLElement) {
        Object.assign(element.dataset, cleanupDataset(dataset));
        return element;
    }
    return null;
}
