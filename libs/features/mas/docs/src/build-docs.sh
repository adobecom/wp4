#!/bin/bash

node ./build-docs.mjs inline-price.md ../inline-price.html
node ./build-docs.mjs checkout-link.md ../checkout-link.html
node ./build-docs.mjs mas.md ../mas.html
node ./build-docs.mjs mas.js.md ../mas.js.html
node ./build-docs.mjs merch-card.md ../merch-card.html
npx esbuild --bundle  --outfile=../spectrum.js ./spectrum.mjs
