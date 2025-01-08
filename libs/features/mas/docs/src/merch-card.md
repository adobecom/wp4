# merch-card custom element

## Introduction

This custom element implements all the merch-card variants provided in acom and ccd figma designs.

A `merch-card` can be rendered using either static html markup or `aem-fragment` custom element to retrieve a card from Odin/AEM.

The CTAs styles depend on Spectrum CSS that must be provided by the consumer.

Designs:

**ACOM**: https://www.figma.com/design/tiEUQLJ1hVlosqwzAATVXZ/Cards-(Merch)?node-id=1086-17994&t=LeMR0vbaBoEKaKln-1

**CCD**: https://www.figma.com/proto/7tUtNgFelfMjgPoJ5QcE1k/Merch%40Scale-Frameworks?node-id=2077-63597&t=cWfdzWlga79eyjyI-1

**CCD Gallery**: [/libs/features/mas/docs/ccd.html](/libs/features/mas/docs/ccd.html)
CCD Gallery provides a comprehensive list of all supported card variants in CCD.

## Examples

### With an Odin/AEM Fragment (VPN required)

```html {.demo .light}
<merch-card id="card1">
    <aem-fragment
        id="fragment1"
        title="CCD Slice Creative Cloud Photography"
        fragment="830f76be-0e83-4faf-9051-3dbb1a1dff04"
    ></aem-fragment>
</merch-card>

<script type="module">
    const log = (target, ...messages) =>
        (target.innerHTML = `${messages.join(' ')}<br>${target.innerHTML}`);
    {
        const target = document.getElementById('log');

        const fragment1 = document.getElementById('fragment1');
        fragment1.addEventListener('aem:load', (e) => {
            log(
                target,
                'aem-fragment is loaded: ',
                JSON.stringify(e.target.data, null, '\t'),
            );
        });

        const card1 = document.getElementById('card1');
        card1.addEventListener('mas:ready', (e) => {
            log(target, 'merch-card is ready: ', e.target.variant);
        });

        card1.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.isCheckoutLink) {
                log(target, 'merch-card checkout-link click: ', e.target);
            } else if (e.target.isInlinePrice) {
                log(target, 'merch-card price click: ', e.target.innerText);
            } else {
                log(target, 'merch-card click: ', e.target);
            }
        });
    }
</script>
```

#### Logs

```html {#log}

```

### With static content (dynamic pricing)

```html {.demo .light}
<merch-card variant="plans" badge-color="#EDCC2D" badge-background-color="#000000"" badge-text=" Best value">
  <merch-icon slot="icons" size="l" src="https://www.adobe.com/content/dam/shared/images/product-icons/svg/creative-cloud.svg" alt="Creative Cloud All Apps"></merch-icon>
  <h4 slot="heading-xs">Creative Cloud All Apps</h4>
  <h3 slot="heading-m">
      <span is="inline-price" data-display-per-unit="false" data-display-recurrence="true"
          data-display-tax="false" data-wcs-osi="r_JXAnlFI7xD6FxWKl2ODvZriLYBoSL701Kd1hRyhe8"></span>
  </h3>
  <p slot="body-xxs">Desktop</p>
  <div slot="body-xs">
      <p>Get 20+ Creative Cloud apps including Photoshop, Illustrator, Adobe Express, Premiere Pro, and
          Acrobat Pro. (Substance 3D apps are not included.)</p>
      <p><a href="https://adobe.com">See plans & pricing details</a></p>
  </div>
  <div slot="footer">
      <a is="checkout-link" href="#" class="con-button blue active" data-wcs-osi="r_JXAnlFI7xD6FxWKl2ODvZriLYBoSL701Kd1hRyhe8">Save now</a>
  </div>
</merch-card>
```

### Attributes

| Name        | Description                                                                                                                                                                                           | Default Value | Required | Provider |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- | -------- |
| `variant`   | Variant in terms design. Not required when used with an `aem-fragment`                                                                                                                                |               | `false`  | mas.js   |
| `consonant` | Uses Consonant for the footer CTA styles during hydration from an aem fragment                                                                                                                        | `false`       | `false`  | mas.js   |
| `spectrum`  | Uses Spectrum for the footer CTA styles during hydration from an aem fragment. (options: `css`, `swc`)                                                                                                | `css`         | `false`  | mas.js   |
| `size`      | card width; a card can span over 2 columns or entire row on a css grid `wide\|super-wide`                                                                                                             |               | `false`  | mas.js   |
| `daa-lh`    | Analytics identifier of a card. Value is coming from the 'PRODUCT_CODE' tag set on the card (for now manual authoring required, later will be tagged automatically). Sample values: 'ccsn' or 'phlt'. |               | `false`  | mas.js   |

#### Active variants:

-   `catalog`
-   `image`
-   `inline-heading`
-   `mini-compare-chart`
-   `plans`
-   `product`
-   `segment`
-   `special-offers`
-   `twp`
-   `ccd-slice`
-   `ccd-suggested`

### Properties

| Name             | Description                                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateComplete` | a promise that resolves when the `merch-card` finishes to execute render method. Doesn't mean that card is ready, for that use 'mas:ready' or 'mas:error' event. |

### Events

We recommend to listen to events on the container, so that listener is attached before the merch card is appended to DOM.
The reason is that some merch cards are resolved very quickly and event could dispatch before event listener is attached by consumer code.

| Name        | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `mas:ready` | fires when all the prices & checkout links are resolved & renderered         |
| `mas:error` | fires when at least a price or checkout link cannot be resolved after render |

### `mas:ready` & `mas:error`

```html {.demo .light}
<style>
    .event-demo {
        outline: 2px solid;
    }
    merch-card.ready {
        outline-color: lime;
    }

    merch-card.error {
        outline-color: red;
        display: block;
        width: 300px;
        height: 200px;
        margin-top: 16px;
    }
</style>
<merch-card class="event-demo">
    <aem-fragment
        fragment="d8008cac-010f-4607-bacc-a7a327da1312"
    ></aem-fragment>
</merch-card>

<p>Checkout link OSI is wrong</p>
<merch-card class="event-demo">
    <aem-fragment
        fragment="3c29614a-a024-458f-8bd6-ee910898f684"
    ></aem-fragment>
</merch-card>

<p>Fragment id is wrong</p>
<merch-card class="event-demo">
    <aem-fragment fragment="wrong-fragment-id"></aem-fragment>
</merch-card>

<button id="btnRefreshFragments">Refresh Fragments</button>

<script type="module">
    {
        const target = document.getElementById('log2');
        [...document.querySelectorAll('.event-demo')].forEach((card) => {
            card.addEventListener('aem:ready', (e) =>
                log(target, `${e.target.nodeName}: ${e.detail}`),
            );
            card.addEventListener('aem:error', (e) =>
                log(target, `${e.target.nodeName}: ${e.detail}`),
            );

            card.addEventListener('mas:ready', () => {
                card.classList.add('ready');
                card.classList.remove('error');
            });
            card.addEventListener('mas:error', (e) => {
                card.classList.remove('ready');
                card.classList.add('error');
                log(target, `${e.target.nodeName}: ${e.detail}`);
            });

            document
                .getElementById('btnRefreshFragments')
                .addEventListener('click', () => {
                    document
                        .querySelector('mas-commerce-service')
                        .refreshFragments();
                });
        });
    }
</script>
```

```html {#log2}

```

## aem-fragment custom element

### Attributes

| Name       | Description                                                                              | Default Value | Required | Provider      |
| ---------- | ---------------------------------------------------------------------------------------- | ------------- | -------- | ------------- |
| `fragment` | Fragment id. The copy/use feature in M@S Studio will copy the id/markup to the clipboard |               | `true`   | consumer code |
| `title`    | Informative title                                                                        |               | `false`  | consumer code |
| `ims`      | attempts to use an IMS access token via `window.adobeid.authorize()` to fetch a fragment |               | `false`  | mas.js        |

### Properties

| Name             | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| `data`           | Current fragment RAW data that is used to render the merch-card                    |
| `updateComplete` | Promise that resolves when the fragment is retrieved and `aem:load` event is fired |

### Methods

| Name        | Description                          |
| ----------- | ------------------------------------ |
| `refresh()` | Refreshes fragment content from Odin |

### Events

| Name        | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `aem:load`  | fires when the fragment is successfully loaded                                          |
| `aem:error` | fires when the fragment cannot be loaded, e.g. network error, wrong fragment id, etc... |

```html {.demo .light}
<merch-card id="psCard2">
    <aem-fragment
        fragment="d8008cac-010f-4607-bacc-a7a327da1312"
    ></aem-fragment>
</merch-card>
<button id="btnRefresh">Refresh</button>
<script type="module">
    {
        const target = document.getElementById('log3');

        const psCard = document.getElementById('psCard2');
        psCard.addEventListener('mas:ready', (e) => {
            log(target, 'merch-card is ready: ', e.target.variant);
        });
        const aemFragment = psCard.querySelector('aem-fragment');
        aemFragment.addEventListener('aem:load', (e) => {
            log(target, JSON.stringify(e.detail));
            log(target, 'aem-fragment has loaded');
        });
        document.getElementById('btnRefresh').addEventListener('click', () => {
            aemFragment.refresh();
        });
    }
</script>
```

```html {#log3}

```

## Extending merch-card

The `merch-card` custom element renders content in its default slot, allowing consumers to seamlessly extend it with additional UI capabilities.

### Example

In the demo below, the `aem-fragment` custom element is headless and does not render any content.
The `sp-action-button` custom element renders into the default slot as no explicit slot is provided.

```html {.demo .light}
<style>
    merch-card button {
        position: absolute;
        display: none;
        top: 4px;
        right: 4px;
    }

    merch-card:hover button {
        display: block;
    }
</style>
<merch-card>
    <aem-fragment
        fragment="d8008cac-010f-4607-bacc-a7a327da1312"
    ></aem-fragment>
    <button id="ctxBtn">...</button>
</merch-card>
<script type="module">
    document
        .getElementById('ctxBtn')
        .addEventListener(
            'click',
            (e) =>
                (e.target.parentElement.style.backgroundColor =
                    'var(--spectrum-blue-300)'),
        );
</script>
```
