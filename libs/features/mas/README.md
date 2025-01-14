# Merch At Scale

This repository provides a suite of features and web components to support merchandising content across various surfaces, starting from adobe.com. It integrates core commerce capabilities and reusable components designed to simplify development and improve the user experience.

For a developer guide please see [mas.js documentation](https://www.adobe.com/libs/features/mas/docs/mas.js.html)

## Features

### Web Components

Interactive web components built using the [Lit](https://lit.dev/) framework, offering a vanilla HTML/JS approach:

-   **Merch Cards**
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
-   **Merch Card Collection**
    -   Features:
        -   Filtering by category and device type
        -   Keyword search
        -   Sorting (natural order)
        -   Deep linking
        -   Query parameter support
        -   "Show more" button

### Commerce Services

Generic commerce-related logic, including:

-   `mas-commerce-service` to enable mas commerce in the page
-   `price` and `checkout-link` custom elements
-   Functions for building checkout URLs and resolving price offers

### Installation

```sh
npm install
```

### Building

mas builds packages both for Milo and external consumers.
the evergreen mas.js is located at /libs/features/mas/dist/mas.js

```sh
npm run build
```

#### Build documentation

```sh
npm run build:docs
```

### Testing

This package uses:

-   [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
-   [ChaiJS](https://www.chaijs.com/api/bdd/)
-   [SinonJS](https://sinonjs.org/releases/v15/)

Run all tests:

```sh
npm run test
```

Run a specific test:

```sh
npm run test:file -- test/settings.test.js
```

## Linting

```sh
npm run lint
```

## Troubleshooting

Reach out in the `#merch-at-scale` Slack channel for support.
