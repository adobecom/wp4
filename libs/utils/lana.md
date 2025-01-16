# LANA: Log Always Never Assume

## Usage

Milo scripts will set the `window.lana` global object that is used for all LANA interactions.

Errors can be logged using `window.lana.log`.

Any uncaught errors (or Promise Rejections) will automatically be logged to LANA.

Note that any errors that happen on a `*.corp.adobe.com` domain will automatically be logged to LANA Stage.  This is to ensure that any errors logged to production LANA will be customer facing errors.

### Syntax

`window.lana.log(message, options)`

### Parameters

* `message` - string: **REQUIRED** The message to be logged.

* `options` - object:
    * **`clientId`** - string: **REQUIRED**
        * The client ID to identify the which product team the error belongs to.
    * `endpoint` - string: Prod AdobeIO API endpoint for LANA to send messages to.
    * `endpointStage` - string: Stage AdobeIO API endpoint for LANA to send messages to.
    * `errorType` - string: Defaults to `e`
        * `e` for EXPLICIT errors (developer chose to log this error)
        * `i` for IMPLICIT errors (uncaught errors are logged automatically)
    * `sampleRate` - number: Defaults to `1`
        * An number from `0` to `100`, equivalent to the frequency % of how often the error should be logged to the server.
        * `1` meaning log 1% of the errors to the server
        * `100` meaning every error will be logged
        * `0.01` meaning 0.01% of the errors will be logged
    * `tags` - string: Defaults to `''`
        * Any tags (comma separated) to be added to the message
    * `implicitSampleRate` - number: Defaults to 1
        * same as `sampleRate`
    * `useProd` - bool: Defaults to `true`
        * Toggle between prod and stage endpoints

## Helper Functions

The helper functions have been deprecated in favor of the options being passed with every lana call.

~~`window.lana.setClientId(clientId)`: sets the client ID for the current page.~~

~~`window.lana.setDefaultOptions(options)`: Updates the default options.  Any params not defined in the options object will keep the existing default options.~~

Note that the default option state is stored in `window.lana.options` and can be directly changed there, though it is not recommended as multiple lana clients can co-exist on a single page.

## Debugging

Debugging mode can be enabled by setting a `lanaDebug` query param.  This sends lana messages with debug enabled and will console.log the responses.
Alternatively, the `window.lana.debug` property can be set (the query param also sets this property).

The Lana logging sample rate can be overridden with the `lana-sample` query param.  It should be set as an integer between 0-100.  This will set the sample rate for all lana messages regardless of other sample rates set.

## localhost

When on a url that contains "localhost", logged messages will not be sent to the server and will be displayed in the console.  However if debug is enabled, then messages will be sent.

The `window.lana.localhost` property is set when "localhost" is detected in the url or can be manually set.

## Example

Explicit error logged and sent to LANA half the time:

```javascript
try {
    somethingThatThrows();
} catch (e) {
    window.lana.log('Failed attempting something.  Error: ' + e.message, {
        clientId: 'dxdc',
        sampleRate: 50,
    })
}
```

## Useage outside of Milo

If you can use dynamic imports you can do similar to milo:
```
function loadLana(options = {}) {
  if (window.lana) return;

  const lanaError = (e) => {
    window.lana?.log(e.reason || e.error || e.message, { errorType: 'i' });
  };

  window.lana = {
    log: async (...args) => {
      window.removeEventListener('error', lanaError);
      window.removeEventListener('unhandledrejection', lanaError);
      await import('https://milo.adobe.com/libs/utils/lana.js');
      return window.lana.log(...args);
    },
    debug: false,
    options,
  };

  window.addEventListener('error', lanaError);
  window.addEventListener('unhandledrejection', lanaError);
}
```
This has the advantage of not loading lana until it's needed.  This also will automatically catch any global errors or unhandledrejections.

If you need to include lana.js directly (or can't load dynamic modules) you can use a script tag:
`<script src="https://milo.adobe.com/libs/utils/lana.js"></script>`

## Notes
* Implicit Error logging
    * There are 2 global event listeners added by LANA to catch errors:
        * `window.addEventListener('error', ...);`
        * `window.addEventListener('unhandledrejection', ...);`


### Links

1. [WCMS Ops LANA Wiki](https://wiki.corp.adobe.com/display/WCMSOps/LANA+-+Log+Always+Never+Assume)
