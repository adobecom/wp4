import * as esbuild from 'esbuild'; // eslint-disable-line
import fs from 'node:fs';

fs.rmSync('./dist/', { recursive: true, force: true });

await esbuild.build({
  entryPoints: ['navigation.css', 'footer.css', 'dark-nav.css', 'base.css'],
  bundle: true,
  minify: true,
  outdir: './dist/',
  plugins: [{
    name: 'dont-bundle-svg',
    setup({ onResolve }) {
      onResolve({ filter: /^<svg/ }, ({ path }) => ({ path, external: true }));
    },
  }],
});

// This function behaves slightly different
// than the built in split function in
// that it only splits the array xs into two arrays
// on the first occurence of y only
const splitAt = (xs, y) => {
  if (!xs.length) return null;
  const splitInternal = (before, after) => {
    if (!after.length) return [before, []];
    const [x, ...rest] = after;
    if (x === y) return [before, rest];
    return splitInternal(before.concat([x]), rest);
  };
  return splitInternal([], xs);
};

const StyleLoader = {
  name: 'inline-style',
  setup({ onLoad }) {
    const template = (css) => `
      typeof document<'u'&&
      document.head
        .appendChild(document.createElement('style'))
        .appendChild(document.createTextNode(${JSON.stringify(css)}))`;
    onLoad({ filter: /\.css$/ }, async (args) => {
      const { path } = args;
      const [before, after] = splitAt(path.split('/'), 'navigation');
      const newPath = before
        .concat(['navigation', 'dist'])
        .concat(after)
        .join('/');
      const css = await fs.promises.readFile(newPath, 'utf8');
      return { contents: template(css) };
    });
  },
};

await esbuild.build({
  entryPoints: ['navigation.js'],
  bundle: true,
  splitting: true,
  format: 'esm',
  sourcemap: true,
  outdir: './dist/',
  plugins: [StyleLoader],
});
