import { writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const outfolder = '../../deps/mas';

const defaults = {
    bundle: true,
    format: 'esm',
    minify: true,
    // sourcemap: true,
    platform: 'browser',
    target: ['es2020'],
};

// commerce.js
const { metafile } = await build({
    ...defaults,
    alias: {
        react: 'test/mocks/react.js',
    },
    entryPoints: ['./src/commerce.js'],
    metafile: true,
    outfile: `${outfolder}/commerce.js`,
    platform: 'browser',
});
writeFileSync(`commerce.json`, JSON.stringify(metafile));

// mas.js
await build({
    ...defaults,
    entryPoints: ['./src/mas.js'],
    outfile: './dist/mas.js',
});

await build({
    ...defaults,
    entryPoints: ['./src/mas.js'],
    outfile: `${outfolder}/mas.js`,
});

// web components
Promise.all([
    build({
        ...defaults,
        stdin: { contents: '' },
        inject: ['./src/merch-card.js', './src/merch-icon.js'],
        outfile: `${outfolder}/merch-card.js`,
        plugins: [rewriteImports()],
    }),
    build({
        ...defaults,
        stdin: { contents: '' },
        inject: ['./src/merch-offer.js', './src/merch-offer-select.js'],

        outfile: `${outfolder}/merch-offer-select.js`,
        plugins: [rewriteImports()],
    }),
    build({
        ...defaults,
        entryPoints: ['./src/merch-card-collection.js'],
        plugins: [rewriteImports()],
        outfile: `${outfolder}/merch-card-collection.js`,
    }),
    build({
        ...defaults,
        entryPoints: ['./src/sidenav/merch-sidenav.js'],
        outfile: `${outfolder}/merch-sidenav.js`,
        plugins: [rewriteImportsToLibsFolder()],
        external: ['lit'],
    }),
    buildLitComponent('merch-icon'),
    buildLitComponent('merch-quantity-select'),
    buildLitComponent('merch-secure-transaction'),
    buildLitComponent('merch-stock'),
    buildLitComponent('merch-twp-d2p'),
    buildLitComponent('merch-subscription-panel'),
    buildLitComponent('merch-whats-included'),
    buildLitComponent('merch-mnemonic-list'),
]).catch(() => process.exit(1));

function rewriteImports() {
    return {
        name: 'rewrite-imports',
        setup(build) {
            build.onResolve({ filter: /^lit(\/.*)?$/ }, () => {
                return {
                    path: '../lit-all.min.js',
                    external: true,
                };
            });
        },
    };
}

async function buildLitComponent(name) {
    const { metafile } = await build({
        ...defaults,
        entryPoints: [`./src/${name}.js`],
        external: ['lit'],
        metafile: true,
        outfile: `${outfolder}/${name}.js`,
        plugins: [rewriteImports()],
    });
    writeFileSync(`${outfolder}/${name}.json`, JSON.stringify(metafile));
}

function rewriteImportsToLibsFolder() {
    return {
        name: 'rewrite-imports-to-libs-folder',
        setup(build) {
            build.onResolve({ filter: /^lit(\/.*)?$/ }, () => {
                return {
                    path: '/libs/deps/lit-all.min.js',
                    external: true,
                };
            });
        },
    };
}
