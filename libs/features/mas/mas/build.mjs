import { build } from 'esbuild';
import fs from 'node:fs';

const defaults = {
    alias: {
        react: '../mocks/react.js',
    },
    bundle: true,
    format: 'esm',
    metafile: true,
    minify: true,
    platform: 'browser',
    target: ['es2020'],
    external: [],
    sourcemap: true,
};

const { metafile } = await build({
    ...defaults,
    entryPoints: ['./src/mas.js'],
    outfile: './dist/mas.js',
});

await build({
    ...defaults,
    entryPoints: ['./src/mas.js'],
    outfile: '../../../deps/mas/mas.js',
});

fs.writeFileSync('mas.json', JSON.stringify(metafile));
