# seotech

Collection of SEO-related features that use the `seotech` service.
See [structured-data](https://milo.adobe.com/docs/authoring/structured-data) for authoring documentation including examples.
See [seotech](https://git.corp.adobe.com/pages/wcms/seotech/) for documentation regarding the service.

## Usage

### Video

This feature selects a video url from the page then queries the SEOTECH service for structured data.
If a valid VideoObject is returned then it is appended to the head of the document as JSON-LD.

Metadata Properties:

- `seotech-video-url`: url for query sent to /getVideoObject

Video Platforms:

- YouTube: Supported
- Adobe TV: Supported
- BYO HTML5: See "Structured Data"

See [video-metadata](../../blocks/video-metadata/) if you need to define a specific VideoObject on your page.

### Structured Data

This feature queries the SEOTECH service for adhoc structured data that should be added to the page.

Metadata Properties:

- `seotech-structured-data`: `on` to enable SEOTECH lookup

See [Structured Data for Milo](https://wiki.corp.adobe.com/x/YpPwwg) (Corp Only) for complete documentation.

<!-- MARK: dev -->
## Development

### Proxy

adobe.com proxies the `/seotech` (Milo) endpoints of the seotech API:

- Production: https://www.adobe.com/seotech/api/
- Stage: https://www.stage.adobe.com/seotech/api/

We always use production seotech regardless of Milo environment.

### Unit Tests

Test seotech only:

    npm run test:file -- test/features/seotech/seotech.test.js

### JSON-LD

You can confirm expected JSON-LD is on you page using console:

    Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((el) => JSON.parse(el.innerText))

### seotech-video-url

Proxy Examples:

- Adobe: https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/adobe/26535
- YouTube: https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/youtube/dQw4w9WgXcQ
- Error (400 Bad Provider): https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/foo/bar
- Error (404 Not Found): https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/youtube/lolz

#### Test Pages

Create/edit test pages as necessary: [milo/drafts/seotech/features/seotech-video](https://adobe.sharepoint.com/:f:/r/sites/adobecom/Shared%20Documents/milo/drafts/seotech/milo/features/seotech-video?csf=1&web=1&e=OWVZmT)

Develop with `aem up` using local urls:

- http://localhost:3000/drafts/seotech/milo/features/seotech-video/adobe
- http://localhost:3000/drafts/seotech/milo/features/seotech-video/youtube
- http://localhost:3000/drafts/seotech/milo/features/seotech-video/error

Test your development branch once you push.
Remember to change _stage_ and _adobecom_ to your own branch and user as needed:

- https://stage--milo--adobecom.aem.page/drafts/seotech/milo/features/seotech-video/adobe
- https://stage--milo--adobecom.aem.page/drafts/seotech/milo/features/seotech-video/youtube
- https://stage--milo--adobecom.aem.page/drafts/seotech/milo/features/seotech-video/error

Test stage urls once your PR is merged into stage:

- https://milo.stage.adobe.com/drafts/seotech/milo/features/seotech-video/adobe
- https://milo.stage.adobe.com/drafts/seotech/milo/features/seotech-video/youtube
- https://milo.stage.adobe.com/drafts/seotech/milo/features/seotech-video/error

Test production urls once stage is merged into main:

- https://milo.adobe.com/drafts/seotech/milo/features/seotech-video/adobe
- https://milo.adobe.com/drafts/seotech/milo/features/seotech-video/youtube
- https://milo.adobe.com/drafts/seotech/milo/features/seotech-video/error
