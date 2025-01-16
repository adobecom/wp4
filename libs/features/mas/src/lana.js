// Default configuration for logging system
const config = {
    clientId: 'merch-at-scale',
    delimiter: '¶',
    ignoredProperties: ['analytics', 'literals'],
    serializableTypes: ['Array', 'Object'],
    sampleRate: 1,
    tags: 'acom',
    isProdDomain: false,
};
// total lana limit in /utils/lana.js is 2000
const PAGE_LIMIT = 1000;

const seenPayloads = new Set();

function isError(value) {
    return (
        value instanceof Error || typeof value?.originatingRequest === 'string'
    );
}

function serializeValue(value) {
    if (value == null) return undefined;
    const type = typeof value;

    if (type === 'function') {
        return value.name ? `function ${value.name}` : 'function';
    }

    if (type === 'object') {
        if (value instanceof Error) return value.message;

        if (typeof value.originatingRequest === 'string') {
            const { message, originatingRequest, status } = value;
            return [message, status, originatingRequest]
                .filter(Boolean)
                .join(' ');
        }

        const objectType =
            value[Symbol.toStringTag] ??
            Object.getPrototypeOf(value).constructor.name;
        if (!config.serializableTypes.includes(objectType)) return objectType;
    }
    return value;
}

// Custom serializer that respects ignored properties
function serializeParam(key, value) {
    if (config.ignoredProperties.includes(key)) return undefined;
    return serializeValue(value);
}

const lanaAppender = {
    append(entry) {
        if (entry.level !== 'error') return;
        const { message, params } = entry;
        const errors = [];
        const values = [];
        let payload = message;

        params.forEach((param) => {
            if (param != null) {
                (isError(param) ? errors : values).push(param);
            }
        });

        if (errors.length) {
            payload += ' ' + errors.map(serializeValue).join(' ');
        }

        const { pathname, search } = window.location;
        let page = `${config.delimiter}page=${pathname}${search}`;
        if (page.length > PAGE_LIMIT) {
          page = `${page.slice(0, PAGE_LIMIT)}<trunc>`;
        }
        payload += page;

        if (values.length) {
            payload += `${config.delimiter}facts=`;
            payload += JSON.stringify(values, serializeParam);
        }

        if (!seenPayloads.has(payload)) {
            seenPayloads.add(payload);
            window.lana?.log(payload, config);
        }
    },
};

// Allow dynamic config updates
function updateConfig(newConfig) {
  Object.assign(
      config,
      Object.fromEntries(
          Object.entries(newConfig).filter(
              ([key, value]) =>
                  key in config &&
                  value !== '' &&
                  value !== null &&
                  value !== undefined &&
                  !Number.isNaN(value), // Correctly exclude NaN
          ),
      ),
  );
}

export { config, lanaAppender, updateConfig };
