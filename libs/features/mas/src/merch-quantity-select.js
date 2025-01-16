import { html, LitElement } from 'lit';
import { styles } from './merch-quantity-select.css.js';

import { ARROW_DOWN, ARROW_UP, ENTER } from './focus.js';
import { EVENT_MERCH_QUANTITY_SELECTOR_CHANGE } from './constants.js';

export class MerchQuantitySelect extends LitElement {
    static get properties() {
        return {
            closed: { type: Boolean, reflect: true },
            selected: { type: Number },
            min: { type: Number },
            max: { type: Number },
            step: { type: Number },
            maxInput: { type: Number, attribute: 'max-input' },
            defaultValue: {
                type: Number,
                attribute: 'default-value',
                reflect: true,
            },
            title: { type: String },
        };
    }

    static get styles() {
        return styles;
    }

    constructor() {
        super();
        this.options = [];
        this.title = '';
        this.closed = true;
        this.min = 0;
        this.max = 0;
        this.step = 0;
        this.maxInput = undefined;
        this.defaultValue = undefined;
        this.selectedValue = 0;
        this.highlightedIndex = 0;
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.boundKeydownListener = this.handleKeydown.bind(this);
        this.addEventListener('keydown', this.boundKeydownListener);
        window.addEventListener('mousedown', this.handleClickOutside);
    }

    handleKeyup() {
        this.handleInput();
        this.sendEvent();
    }

    handleKeydown(e) {
        switch (e.key) {
            case ARROW_DOWN:
                if (!this.closed) {
                    e.preventDefault();
                    this.highlightedIndex =
                        (this.highlightedIndex + 1) % this.options.length;
                    this.requestUpdate();
                }
                break;
            case ARROW_UP:
                if (!this.closed) {
                    e.preventDefault();
                    this.highlightedIndex =
                        (this.highlightedIndex - 1 + this.options.length) %
                        this.options.length;
                    this.requestUpdate();
                }
                break;
            case ENTER:
                if (!this.closed) {
                    const option = this.options[this.highlightedIndex];
                    if (!option) break;
                    this.selectedValue = option;
                    this.handleMenuOption(this.selectedValue);
                    this.toggleMenu();
                } else {
                    this.closePopover();
                    this.blur();
                }
                break;
        }
        if (e.composedPath().includes(this)) e.stopPropagation();
    }

    handleInput() {
        const inputField = this.shadowRoot.querySelector('.text-field-input');
        const inputValue = parseInt(inputField.value);
        if (
            !isNaN(inputValue) &&
            inputValue > 0 &&
            inputValue !== this.selectedValue
        ) {
            const adjustedInputValue =
                this.maxInput && inputValue > this.maxInput
                    ? this.maxInput
                    : inputValue;
            this.selectedValue = adjustedInputValue;
            inputField.value = adjustedInputValue;
            this.highlightedIndex = this.options.indexOf(adjustedInputValue);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mousedown', this.handleClickOutside);
        this.removeEventListener('keydown', this.boundKeydownListener);
    }

    generateOptionsArray() {
        const options = [];
        if (this.step > 0) {
            for (let value = this.min; value <= this.max; value += this.step) {
                options.push(value);
            }
        }
        return options;
    }

    updated(changedProperties) {
        if (
            changedProperties.has('min') ||
            changedProperties.has('max') ||
            changedProperties.has('step') ||
            changedProperties.has('defaultValue')
        ) {
            this.options = this.generateOptionsArray();
            this.highlightedIndex = this.defaultValue
                ? this.options.indexOf(this.defaultValue)
                : 0;
            this.handleMenuOption(
                this.defaultValue ? this.defaultValue : this.options[0],
            );
            this.requestUpdate();
        }
    }

    handleClickOutside(event) {
        const path = event.composedPath();
        if (!path.includes(this)) {
            this.closePopover();
        }
    }

    toggleMenu() {
        this.closed = !this.closed;
    }

    handleMouseEnter(index) {
        this.highlightedIndex = index;
        this.requestUpdate();
    }

    handleMenuOption(option) {
        if (option === this.max)
            this.shadowRoot.querySelector('.text-field-input')?.focus();
        this.selectedValue = option;
        this.sendEvent();
        this.closePopover();
    }

    sendEvent() {
        const customEvent = new CustomEvent(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            {
                detail: { option: this.selectedValue },
                bubbles: true,
            },
        );
        this.dispatchEvent(customEvent);
    }

    closePopover() {
        if (!this.closed) {
            this.toggleMenu();
        }
    }

    get offerSelect() {
        return this.querySelector('merch-offer-select');
    }

    get popover() {
        return html` <div class="popover ${this.closed ? 'closed' : 'open'}">
            ${this.options.map(
                (option, index) => html`
                    <div
                        class="item ${index === this.highlightedIndex
                            ? 'highlighted'
                            : ''}"
                        @click="${() => this.handleMenuOption(option)}"
                        @mouseenter="${() => this.handleMouseEnter(index)}"
                    >
                        ${option === this.max ? `${option}+` : option}
                    </div>
                `,
            )}
        </div>`;
    }

    render() {
        return html`
            <div class="label">${this.title}</div>
            <div class="text-field">
                <input
                    class="text-field-input"
                    @focus="${this.closePopover}"
                    .value="${this.selectedValue}"
                    type="number"
                    @keydown="${this.handleKeydown}"
                    @keyup="${this.handleKeyup}"
                />
                <button class="picker-button" @click="${this.toggleMenu}">
                    <div
                        class="picker-button-fill ${this.closed
                            ? 'open'
                            : 'closed'}"
                    ></div>
                </button>
                ${this.popover}
            </div>
        `;
    }
}

customElements.define('merch-quantity-select', MerchQuantitySelect);
