// run test:
// npm run nala stage tag=timeline

import { expect, test } from '@playwright/test';
import { features } from './timeline.spec.js';
import TimelineBlock from './timeline.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: verify the text in the timeline block
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const timeline = new TimelineBlock(page);
  const URL = `${baseURL}${features[0].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);

  await expect(timeline.heading1).toHaveText('Day 1');
  await expect(timeline.heading2).toHaveText('Day 8');
  await expect(timeline.heading3).toHaveText('Day 21');
  await expect(timeline.text1).toHaveText('If you start your free trial today');
  await expect(timeline.text2).toHaveText('Your subscription starts and billing begins');
  await expect(timeline.text3).toHaveText('Full refund period ends');
  await expect(timeline.banner1).toHaveText('7-day free trial');
  await expect(timeline.banner2).toHaveText('14-day full refund period');
});

// Test 1: verify the CSS style and the analytic
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const timeline = new TimelineBlock(page);
  const URL = `${baseURL}${features[1].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);

  await expect(timeline.bar1).toHaveCSS('background-color', 'rgb(230, 56, 136)');
  await expect(timeline.bar2).toHaveCSS('background-color', 'rgb(233, 116, 154)');
  await expect(timeline.bar3).toHaveCSS('background-color', 'rgb(255, 206, 46)');
  await expect(timeline.bar1).toHaveCSS('width', '2px');
  await expect(timeline.bar2).toHaveCSS('width', '2px');
  await expect(timeline.bar3).toHaveCSS('width', '2px');
  await expect(timeline.banner1).toHaveCSS('background-image', 'linear-gradient(to right, rgb(230, 56, 136) 0px, rgb(233, 116, 154) 100%)');
  await expect(timeline.banner2).toHaveCSS('background-color', 'rgb(255, 206, 46)');

  await expect(timeline.timelineBlock).toHaveAttribute('daa-lh', 'b2|timeline');
  await expect(timeline.timelineBlock).toBeVisible();
});

// Test 2: run Accessibility tests
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  const timeline = new TimelineBlock(page);
  const URL = `${baseURL}${features[1].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await runAccessibilityTest({ page, testScope: timeline.timelineBlock });
});
