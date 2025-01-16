import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

/**
 * Custom image diff function for visualRegressionPlugin that
 * clears a specific area in the screenshot before comparing.
 */
export function pixelMatchDiff({ name, baselineImage, image, options }) {
    let error = '';
    let basePng = PNG.sync.read(baselineImage);
    let png = PNG.sync.read(image);

    let { width, height } = png;
    const x = /mobile/.test(name) ? 250 : /tablet/.test(name) ? 450 : 600;

    // Clear the viewport size tooltip at the top.
    for (let cy = 5; cy < 25; cy++) {
        for (let cx = x; cx < x + 200; cx++) {
            const idx = (width * cy + cx) << 2; // Formula to get pixel index in the data array
            png.data[idx] = 255; // Red channel = 0
            png.data[idx + 1] = 255; // Green channel = 0
            png.data[idx + 2] = 255; // Blue channel = 0
            png.data[idx + 3] = 255; // Alpha = 255 (fully opaque)
        }
    }

    if (basePng.width !== png.width || basePng.height !== png.height) {
        error =
            `Screenshot is not the same width and height as the baseline. ` +
            `Baseline: { width: ${basePng.width}, height: ${basePng.height} } ` +
            `Screenshot: { width: ${png.width}, height: ${png.height} }`;

        width = Math.max(basePng.width, png.width);
        height = Math.max(basePng.height, png.height);

        const oldPng = basePng;
        basePng = new PNG({ width, height });
        oldPng.data.copy(basePng.data, 0, 0, oldPng.data.length);

        const oldPng2 = png;
        png = new PNG({ width, height });
        oldPng2.data.copy(png.data, 0, 0, oldPng2.data.length);
    }

    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
        basePng.data,
        png.data,
        diff.data,
        width,
        height,
        options,
    );
    const diffPercentage =
        Math.floor(
            ((numDiffPixels / (width * height)) * 100 + Number.EPSILON) * 1000,
        ) / 1000;

    return {
        error,
        diffImage: PNG.sync.write(diff),
        diffPercentage,
        diffPixels: numDiffPixels,
    };
}
