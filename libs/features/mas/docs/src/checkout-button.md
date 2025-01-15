# checkout-button {#checkout-button}

## Introduction {#introduction}

This custom element renders a checkout button supporting most of the features documented at https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+button+Creation+Guide.<br>

Behind the scene, it uses https://git.corp.adobe.com/PandoraUI/commerce-core to generate the checkout url.

It requires an Offer Selector ID to retrieve the offer details from WCS.

See [MAS](mas.html#terminology) to learn more.

ℹ️ Unlike `checkout-link`, in order to prevent the default click event from redirecting to checkout url, register the click event using `{capture: true}`.
<br>See the demo at the [end](#example-2)

### Example

```html {.demo}
<button
    is="checkout-button"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
>
    Buy now
</button>
```

## Attributes {#attributes}

| Attribute                     | Description                                                                                                                                                                                                                                      | Default Value | Required | Provider                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------- | ----------------------- |
| `data-wcs-osi`                | Offer Selector ID, can be multiple, separeted by comma                                                                                                                                                                                           |               | `true`   | mas.js or consumer code |
| `data-checkout-workflow`      | Target checkout workflow for the generation of checkout urls                                                                                                                                                                                     | UCv3          | `false`  | mas.js                  |
| `data-checkout-workflow-step` | [workflow step](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+button+Creation+Guide#UCv3buttonCreationGuide-RegularWorkflow) to land on the unified checkout page                                       | email         | `false`  | mas.js                  |
| `data-extra-options`          | additional query params to append to the url, see: [Table of public query params](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=businessservices&title=UCv3+button+Creation+Guide#UCv3buttonCreationGuide-Tableofpublicqueryparams) | {}            | `false`  | mas.js                  |
| `data-ims-country`            | the ims country to code of the user if signed in, overrides the locale country in the generated checkout url                                                                                                                                     |               | `false`  | mas.js or consumer code |
| `data-perpetual`              | whether this is a perpetual offer `true\|false`                                                                                                                                                                                                  |               | `false`  | mas.js                  |
| `data-promotion-code`         | Flex promotion code, if applicable                                                                                                                                                                                                               |               | `false`  | mas.js                  |
| `data-quantity`               | Quantity of the offer to purchase                                                                                                                                                                                                                | 1             | `false`  | mas.js or consumer code |
| `data-entitlement`            | `entitlement` flag for client side interpretation                                                                                                                                                                                                | `false`       | `false`  | mas.js                  |
| `data-upgrade`                | `upgrade` flag for client side interpretation                                                                                                                                                                                                    | `false`       | `false`  | mas.js                  |
| `data-modal`                  | `modal` flag for client side interpretation                                                                                                                                                                                                      | `false`       | `false`  | mas.js                  |
| `data-analytics-id`           | human-readable, non-translatable button id for analytics. Authored in Studio in button Editor.                                                                                                                                                   | `false`       | `false`  | mas.js                  |
| `daa-ll`                      | martech-compatible button id for analytics. Format: '${data-analytics-id}-${#}', where # is the position of the button within a card. E.g. : see-terms-1, buy-now-2                                                                              | `false`       | `false`  | mas.js                  |

### Examples {#examples}

#### Custom Workflow Step

```html {.demo}
<button
    is="checkout-button"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-checkout-workflow-step="recommendation"
>
    Buy now
</button>
```

#### Multiple Quantities

Two photoshop and three acrobat pro single apps (TEAMS):

```html {.demo}
<button
    is="checkout-button"
    data-wcs-osi="yHKQJK2VOMSY5bINgg7oa2ov9RnmnU1oJe4NOg4QTYI,vV01ci-KLH6hYdRfUKMBFx009hdpxZcIRG1-BY_PutE"
    data-quantity="2,3"
>
    Buy now
</button>
```

#### Custom query params

```html {.demo}
<button
    is="checkout-button"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-extra-options='{"promoid":"promo12345","mv":1,"mv2":2}'
>
    Buy now
</button>
```

#### IMS Country

```html {.demo}
<button
    is="checkout-button"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-ims-country="JP"
>
    Buy now
</button>
```

## Properties {#properties}

| Property           | Description                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isCheckoutButton` | on checkout button elements, it will return `true`                                                                                                                |
| `onceSettled`      | promise that resolves when the custom-element either resolves or fails to resolve the offer                                                                       |
| `options`          | JSON object with the complete set of properties used to resolve the offer                                                                                         |
| `value`            | The actual offer that is used to render the checkout button. In some cases WCS can return multiple offers but only one will be picked to render for a single app. |

### Example

```html {.demo}
<button
    id="co1"
    is="checkout-button"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
    data-ims-country="CA"
>
    Buy now
</button>
<script type="module">
    document
        .getElementById('co1')
        .onceSettled()
        .then((el) => {
            document.getElementById('coValue').innerHTML = JSON.stringify(
                el.value,
                null,
                '\t',
            );
            document.getElementById('coOptions').innerHTML = JSON.stringify(
                el.options,
                null,
                '\t',
            );
        });
</script>
```

#### value property

```json {#coValue}

```

#### options property

```json {#coOptions}

```

## Methods {#methods}

| Property                       | Description                                                                                                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `requestUpdate(true \| false)` | Causes a re-render using the actual options, force = false by default, meaning if no change is found will skip |

## Events {#events}

| Event          | Description                                        |
| -------------- | -------------------------------------------------- |
| `mas:pending`  | fires when checkout button starts loading          |
| `mas:resolved` | fires when the offer is successfully resolved      |
| `mas:failed`   | fires when the offer could not be found or fetched |

<br>

For each event, the following css classes are toggled on the element: `placeholder-pending`, `placeholder-resolved`, `placeholder-failed`.

### Example

```html {.demo}
<div id="eventsDemo">
    <button
        is="checkout-button"
        data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
        >Buy now (click me)</a
    >
    <br />
    <button
        is="checkout-button"
        data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
        ><span style="pointer-events: none;">Span + <strong>Strong + Buy now</strong></span></a
    >
</div>
<button id="btnRefresh">Refresh</button>
<script type="module">
    const log = document.getElementById('log');
    const logger = (...messages) =>
        (log.innerHTML = `${messages.join(' ')}<br>${log.innerHTML}`);
    const eventsDemo = document.getElementById('eventsDemo');
    eventsDemo.addEventListener('mas:pending', () =>
        logger('checkout-button pending'),
    );
    eventsDemo.addEventListener('mas:resolved', (e) =>
        logger('checkout-button resolved'),
    );
    eventsDemo.addEventListener('mas:failed', () =>
        logger('checkout-button failed'),
    );
    eventsDemo.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.isCheckoutButton) {
            logger('checkout button is clicked: ', e.target.href);
        } else {
            logger('element clicked: ', e.target);
        }
    }, {capture: true});
    document.getElementById('btnRefresh').addEventListener('click', () => {
        [...eventsDemo.querySelectorAll('a')].forEach((a) =>
            a.requestUpdate(true),
        );
    });
</script>
```

#### Logs

```html {#log}

```
