import { LOG_NAMESPACE } from './constants.js';
import { getParameter, isFunction, toBoolean } from './external.js';
import { lanaAppender, updateConfig } from './lana.js';
import { HostEnv } from './settings.js';

const LogLevels = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    WARN: 'warn',
};

const startTime = Date.now();
const appenders = new Set();
const filters = new Set();
const loggerIndexes = new Map();

// Basic console logging for development
const consoleAppender = {
    append({ level, message, params, timestamp, source }) {
        console[level](
            `${timestamp}ms [${source}] %c${message}`,
            'font-weight: bold;',
            ...params,
        );
    },
};

const debugFilter = { filter: ({ level }) => level !== LogLevels.DEBUG };
const quietFilter = { filter: () => false };

function createEntry(level, message, namespace, params, source) {
    return {
        level,
        message,
        namespace,
        get params() {
            if (params.length === 1 && isFunction(params[0])) {
                params = params[0]();
                if (!Array.isArray(params)) params = [params];
            }
            return params;
        },
        source,
        timestamp: Date.now() - startTime,
    };
}

function handleEntry(entry) {
    if ([...filters].every((filter) => filter(entry))) {
        appenders.forEach((appender) => appender(entry));
    }
}

function createLog(namespace) {
    const index = (loggerIndexes.get(namespace) ?? 0) + 1;
    loggerIndexes.set(namespace, index);
    const id = `${namespace} #${index}`;

    const log = {
        id,
        namespace,
        module: (name) => createLog(`${log.namespace}/${name}`),
        updateConfig,
    };

    // Create logging methods for each level
    Object.values(LogLevels).forEach((level) => {
        log[level] = (message, ...params) =>
            handleEntry(createEntry(level, message, namespace, params, id));
    });

    return Object.seal(log);
}

// Plugin system for adding appenders and filters
function use(...plugins) {
    plugins.forEach((plugin) => {
        const { append, filter } = plugin;
        if (isFunction(filter)) filters.add(filter);
        if (isFunction(append)) appenders.add(append);
    });
}

function init(env = {}) {
    const { name } = env;
    const debug = toBoolean(
        getParameter('commerce.debug', { search: true, storage: true }),
        name === HostEnv.LOCAL,
    );

    if (debug) use(consoleAppender);
    else use(debugFilter);
    if (name === HostEnv.PROD) use(lanaAppender);

    return Log;
}

function reset() {
    appenders.clear();
    filters.clear();
}

export const Log = {
    ...createLog(LOG_NAMESPACE),
    Level: LogLevels,
    Plugins: { consoleAppender, debugFilter, quietFilter, lanaAppender },
    init,
    reset,
    use,
};
