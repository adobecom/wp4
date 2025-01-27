# mas.js

## Introduction

This is a javasript library that enables M@S on any web surface.

mas.js includes the followings custom elements:

-   [inline-price](/libs/features/mas/docs/inline-price.html)
-   [checkout-link](/libs/features/mas/docs/checkout-link.html)
-   [checkout-button](/libs/features/mas/docs/checkout-button.html)
-   [merch-card](/libs/features/mas/docs/merch-card.html)

## Enablement `mas-commerce-service`
⚠️ Safari does not support customized built-in elements. Therefore, you need to load the following polyfill before `mas.js` for browser compatibility (not required for in-app usage).
```html
<script
    src="https://www.adobe.comlibs/deps/custom-elements.js"
></script>
```

To add `mas.js` to your page or application, include it as shown below:

```html
<script
    src="https://www.adobe.com/libs/features/mas/dist/mas.js"
    type="module"
></script>
```

### Attributes

| Name                     | Description                                                                                         | Default Value                    | Required |
| ------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------- | -------- |
| `allow-override`         | enables override of commerce env/landscape via query parameters(commerce.env/commerce.landscape)    |  `false`                         |  `false` |
| `checkout-client-id`     | checkout client id                                                                                  |  `false`                         |  `false` |
| `checkout-workflow-step` | default checkout workflow step                                                                      | `CheckoutWorkflowStep.EMAIL`     | `false`  |
| `country`                | country of the offers to retrieve from WCS, determines the currency, price format, etc.             | US or locale country if set      | `false`  |
|  `env`                   | commerce environment you want this page to use, either `stage` or `prod`                            |  `prod`                          |  `false` |
|  `host-env`              | host environment, either `stage` or `prod`                            |  `prod`                          |  `false` |
|  `force-tax-exclusive`   | force all price display to be tax exclusive                                                         |  `false`                         |  `false` |
| `locale`                 | currency & price locale you need, must belong to one of the [supported locales](#supported-locales) | `en_US`                          | `false`  |
| `language`               | language of the price literal, e.g: per license                                                     | en or locale langauge if set     | `false`  |
| `wcs-api-key`            | api key used for making WCS calls                                                                   | `wcms-commerce-ims-ro-user-milo` | `false`  |
| `lana-tags`              | Enables logging via lana[^1][^2] with the given tags. e.g:`ccd`.                       |                                  | `false`  |
| `lana-sample-rate`       | Sets the sampling rate, see [^1] for details.                                                       | 1                                | `false`  |

[^1]: https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=WCMSOps&title=LANA+-+Log+Always+Never+Assume

[^2]: https://github.com/adobecom/milo/blob/stage/libs/utils/lana.js

### Methods

| Name                               | Description                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
|  `registerCheckoutAction (action)` |  registers an action, that must have signature (offers, options, imsSignedInPromise)                   |
|  `flushWcsCache()`                 |  flush the payload cache for WCS calls                                                                 |
|  `refreshOffers()`                 | `flushWcsCache` + refresh prices + checkout links                                                      |
|  `refreshFragments()`              |  `flushWcsCache` + refresh fragment content from Odin. This results in card content update with offers |

### Examples

```html
<!-- for US english production-->
<mas-commerce-service></mas-commerce-service>

<!-- for US english stage-->
<mas-commerce-service env="stage"></mas-commerce-service>

<!-- for other country & language -->
<mas-commerce-service country="CA" language="fr"></mas-commerce-service>

<!-- for other locales, pass locale parameter from the table below -->
<mas-commerce-service locale="en_CA"></mas-commerce-service>

<!-- for other language -->
<mas-commerce-service language="es"></mas-commerce-service>

<!-- for other locale, with different language -->
<mas-commerce-service locale="en_CA" language="es"></mas-commerce-service>

<!-- or with a country and language -->
<mas-commerce-service country="JP" language="en"></mas-commerce-service>

<!-- with custom api key & checkout clientid -->
<mas-commerce-service
    wcs-api-key="custom-api-key"
    checkout-client-id="custom-client-id"
></mas-commerce-service>
```

you can play around with below price, either adding locale, language or env as parameters that will be injected to `mas-commerce-service` as attributes, and then it will be activated.

<p class="example">
  Plans starting at
  <span
    is="inline-price"
    data-display-old-price="true"
    data-display-per-unit="true"
    data-display-recurrence="true"
    data-display-tax="false"
    data-force-tax-exclusive="false"
    data-quantity="1"
    data-template="price"
    data-wcs-osi="A1xn6EL4pK93bWjM8flffQpfEL-bnvtoQKQAvkx574M"
  ></span
  >.
</p>

#### refreshOffers

Toggle the network tab and click on `Refresh` button below

```html {.demo}
<button id="btnRefresh">Refresh</button>
<script type="module">
    document.getElementById('btnRefresh').addEventListener('click', () => {
        document.querySelector('mas-commerce-service').refreshOffers();
    });
</script>
```

### Supported locales

| Locale     | Description                     | Try                                        |
| ---------- | ------------------------------- | ------------------------------------------ |
| en_US      | English (United States)         | [Try](/libs/features/mas/docs/mas.js.html) |
|            |                                 |                                            |
| ar_DZ      | Arabic (Algeria)                | [Try](?locale=ar_DZ)                       |
| ar_EG      | Arabic (Egypt)                  | [Try](?locale=ar_EG)                       |
| ar_SA      | Arabic (Saudi Arabia)           | [Try](?locale=ar_SA)                       |
| bg_BG      | Bulgarian (Bulgaria)            | [Try](?locale=bg_BG)                       |
| cs_CZ      | Czech (Czech Republic)          | [Try](?locale=cs_CZ)                       |
| da_DK      | Danish (Denmark)                | [Try](?locale=da_DK)                       |
| de_AT      | German (Austria)                | [Try](?locale=de_AT)                       |
| de_CH      | German (Switzerland)            | [Try](?locale=de_CH)                       |
| de_DE      | German (Germany)                | [Try](?locale=de_DE)                       |
| de_LU      | German (Luxembourg)             | [Try](?locale=de_LU)                       |
| el_GR      | Greek (Greece)                  | [Try](?locale=el_GR)                       |
| en_AU      | English (Australia)             | [Try](?locale=en_AU)                       |
| en_AZ      | English (Azerbaijan)            | [Try](?locale=en_AZ)                       |
| en_BE      | English (Belgium)               | [Try](?locale=en_BE)                       |
| en_CA      | English (Canada)                | [Try](?locale=en_CA)                       |
| en_DZ      | English (Algeria)               | [Try](?locale=en_DZ)                       |
| en_EG      | English (Egypt)                 | [Try](?locale=en_EG)                       |
| en_GB      | English (United Kingdom)        | [Try](?locale=en_GB)                       |
| en_GR      | English (Greece)                | [Try](?locale=en_GR)                       |
| en_ID      | English (Indonesia)             | [Try](?locale=en_ID)                       |
| en_IE      | English (Ireland)               | [Try](?locale=en_IE)                       |
| en_IN      | English (India)                 | [Try](?locale=en_IN)                       |
| en_LU      | English (Luxembourg)            | [Try](?locale=en_LU)                       |
| en_MT      | English (Malta)                 | [Try](?locale=en_MT)                       |
| en_MU      | English (Mauritius)             | [Try](?locale=en_MU)                       |
| en_MY      | English (Malaysia)              | [Try](?locale=en_MY)                       |
| en_NG      | English (Nigeria)               | [Try](?locale=en_NG)                       |
| en_NZ      | English (New Zealand)           | [Try](?locale=en_NZ)                       |
| en_SA      | English (Saudi Arabia)          | [Try](?locale=en_SA)                       |
| en_SG      | English (Singapore)             | [Try](?locale=en_SG)                       |
| en_TH      | English (Thailand)              | [Try](?locale=en_TH)                       |
| en_ZA      | English (South Africa)          | [Try](?locale=en_ZA)                       |
| es_AR      | Spanish (Argentina)             | [Try](?locale=es_AR)                       |
| es_CL      | Spanish (Chile)                 | [Try](?locale=es_CL)                       |
| es_CO      | Spanish (Colombia)              | [Try](?locale=es_CO)                       |
| es_CR      | Spanish (Costa Rica)            | [Try](?locale=es_CR)                       |
| es_DO      | Spanish (Dominican Republic)    | [Try](?locale=es_DO)                       |
| es_EC      | Spanish (Ecuador)               | [Try](?locale=es_EC)                       |
| es_ES      | Spanish (Spain)                 | [Try](?locale=es_ES)                       |
| es_GT      | Spanish (Guatemala)             | [Try](?locale=es_GT)                       |
| es_MX      | Spanish (Mexico)                | [Try](?locale=es_MX)                       |
| es_PE      | Spanish (Peru)                  | [Try](?locale=es_PE)                       |
| es_US      | Spanish (United States)         | [Try](?locale=es_US)                       |
| et_EE      | Estonian (Estonia)              | [Try](?locale=et_EE)                       |
| fi_FI      | Finnish (Finland)               | [Try](?locale=fi_FI)                       |
| fr_BE      | French (Belgium)                | [Try](?locale=fr_BE)                       |
| fr_CH      | French (Switzerland)            | [Try](?locale=fr_CH)                       |
| fr_FR      | French (France)                 | [Try](?locale=fr_FR)                       |
| fr_LU      | French (Luxembourg)             | [Try](?locale=fr_LU)                       |
| hi_IN      | Hindi (India)                   | [Try](?locale=hi_IN)                       |
| hu_HU      | Hungarian (Hungary)             | [Try](?locale=hu_HU)                       |
| in_ID      | Indonesian (Indonesia)          | [Try](?locale=in_ID)                       |
| it_CH      | Italian (Switzerland)           | [Try](?locale=it_CH)                       |
| it_IT      | Italian (Italy)                 | [Try](?locale=it_IT)                       |
| iw_IL      | Hebrew (Israel)                 | [Try](?locale=iw_IL)                       |
| ja_JP      | Japanese (Japan)                | [Try](?locale=ja_JP)                       |
| ko_KR      | Korean (South Korea)            | [Try](?locale=ko_KR)                       |
| lt_LT      | Lithuanian (Lithuania)          | [Try](?locale=lt_LT)                       |
| lv_LV      | Latvian (Latvia)                | [Try](?locale=lv_LV)                       |
| ms_MY      | Malay (Malaysia)                | [Try](?locale=ms_MY)                       |
| nb_NO      | Norwegian Bokmål (Norway)       | [Try](?locale=nb_NO)                       |
| nl_BE      | Dutch (Belgium)                 | [Try](?locale=nl_BE)                       |
| nl_NL      | Dutch (Netherlands)             | [Try](?locale=nl_NL)                       |
| pl_PL      | Polish (Poland)                 | [Try](?locale=pl_PL)                       |
| pt_BR      | Portuguese (Brazil)             | [Try](?locale=pt_BR)                       |
| pt_PT      | Portuguese (Portugal)           | [Try](?locale=pt_PT)                       |
| ro_RO      | Romanian (Romania)              | [Try](?locale=ro_RO)                       |
| ru_AZ      | Russian (Azerbaijan)            | [Try](?locale=ru_AZ)                       |
| ru_RU      | Russian (Russia)                | [Try](?locale=ru_RU)                       |
| sk_SK      | Slovak (Slovakia)               | [Try](?locale=sk_SK)                       |
| sl_SI      | Slovenian (Slovenia)            | [Try](?locale=sl_SI)                       |
| sv_SE      | Swedish (Sweden)                | [Try](?locale=sv_SE)                       |
| th_TH      | Thai (Thailand)                 | [Try](?locale=th_TH)                       |
| tr_TR      | Turkish (Turkey)                | [Try](?locale=tr_TR)                       |
| uk_UA      | Ukrainian (Ukraine)             | [Try](?locale=uk_UA)                       |
| zh-Hans_CN | Simplified Chinese (China)      | [Try](?locale=zh-Hans_CN)                  |
| zh-Hant_HK | Traditional Chinese (Hong Kong) | [Try](?locale=zh-Hant_HK)                  |
| zh-Hant_TW | Traditional Chinese (Taiwan)    | [Try](?locale=zh-Hant_TW)                  |
