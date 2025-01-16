# Offer Selector Tool (OST)

## About

Offer Selector Tool is a React based UI that allows to discover [offer selectors](https://developers.corp.adobe.com/aos/docs/api/openapi/openapi.yml) and use them in different context.

e.g: insert the price, or select an offer selector to render its checkout URL.

Offer selectors are kind of saved search for AOS offers. They can return multiple offers.

Offer Selector Tool will assume an offer selector returns always a single offer, and always pick the first offer in the result.

Offer Selector Tool is loaded in Milo as external JS and CSS files hosted in Stage environment.

For more info on Tacocat.js or Offer Selector Tool visit https://git.corp.adobe.com/Dexter/tacocat.js/tree/develop/packages/offer-selector-tool

## Development

To prevent IMS from redirecting to sign-in page and back,
so to check OST in a PR branch when test URL is not supported by IMS,
perform the following:
- navigate to adobe.com,
- open devtools console,
- execute `copy(adobeIMS.getAccessToken().token)`,
- add token to OST URL querystring, e.g.: `https://mwpw-127984--milo--vladen.aem.page/tools/ost?token=eyJhb...`

## Settings

| Parameter                    | WCS & AOS Env    |  WCS & AOS landscape   |  Example                                               |
| :---:   | :---: | :---: | :---: |
| default (no parameter)       | Prod             | PUBLISHED              | https://milo.adobe.com/tools/ost                       |
| ?wcsLandscape                | Prod             | DRAFT                  | https://milo.adobe.com/tools/ost?wcsLandscape=DRAFT    |
| ?env=stage                   | Stage            | ALL                    | https://milo.adobe.com/tools/ost?env=stage             |

Please note that the last parameter is not yet fully functional (env=stage). It will switch OST to use aos-stg env but will still use the prod token, so OST won't find any offer. This is to be fixed when the need to use env=stage comes.
