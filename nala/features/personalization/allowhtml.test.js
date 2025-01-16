// PR 2683 https://github.com/adobecom/milo/pull/2683
// to run this test:
// npm run nala stage tag=allowhtml mode=headed

import { expect, test } from '@playwright/test';
import { features } from './allowhtml.spec.js';
import TextBlock from '../../blocks/text/text.page.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const text0 = new TextBlock(page, 0);
  const text1 = new TextBlock(page, 1);
  const text2 = new TextBlock(page, 2);
  const text3 = new TextBlock(page, 3);
  const text4 = new TextBlock(page, 4);
  const text5 = new TextBlock(page, 5);
  const text6 = new TextBlock(page, 6);
  const text7 = new TextBlock(page, 7);
  const text8 = new TextBlock(page, 8);
  const text9 = new TextBlock(page, 9);
  const marquee0 = new MarqueeBlock(page, 0);
  const marquee1 = new MarqueeBlock(page, 1);
  const marquee2 = new MarqueeBlock(page, 2);
  const marquee3 = new MarqueeBlock(page, 3);
  const insertedTextBeforeHeading = '[data-manifest-id="allowhtml.json"] + h2';
  const insertedTextAfterHeading = 'h2 + [data-manifest-id="allowhtml.json"]';
  const URL = `${baseURL}${features[0].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);

  await page.goto(URL);
  await expect(text0.introHeadlineAlt).toHaveText('Before: Replace this Heading');
  await expect(text1.textIntro.locator(insertedTextBeforeHeading)).toHaveCount(0);
  await expect(text2.textIntro.locator(insertedTextAfterHeading)).toHaveCount(0);
  await expect(text3.introHeadlineAlt).toHaveText('Before: Prepend this heading');
  await expect(text4.introHeadlineAlt).toHaveText('Before: Append this heading');
  await expect(text5.introHeadlineAlt).toHaveText('Before: replace this heading with HTML');
  await expect(text5.introHeadlineAlt.locator('a')).toHaveCount(0);
  await expect(text6.textIntro.locator(insertedTextBeforeHeading)).toHaveCount(0);
  await expect(text7.textIntro.locator(insertedTextAfterHeading)).toHaveCount(0);
  await expect(text8.introHeadlineAlt).toHaveText('Before: prepend this heading with HTML');
  await expect(text9.introHeadlineAlt).toHaveText('Before: append this heading with HTML');
  await expect(marquee0.blueButton).toBeVisible();
  await expect(marquee1.outlineButton).toBeVisible();
  await expect(marquee2.actionArea).toBeVisible();
  await expect(marquee3.blueButton).toHaveAttribute('href', 'https://www.adobe.com/');
});

test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const text0 = new TextBlock(page, 0);
  const text1 = new TextBlock(page, 1);
  const text2 = new TextBlock(page, 2);
  const text3 = new TextBlock(page, 3);
  const text4 = new TextBlock(page, 4);
  const text5 = new TextBlock(page, 5);
  const text6 = new TextBlock(page, 6);
  const text7 = new TextBlock(page, 7);
  const text8 = new TextBlock(page, 8);
  const text9 = new TextBlock(page, 9);
  const marquee0 = new MarqueeBlock(page, 0);
  const marquee1 = new MarqueeBlock(page, 1);
  const marquee2 = new MarqueeBlock(page, 2);
  const marquee3 = new MarqueeBlock(page, 3);
  const insertedTextBeforeHeading = '[data-manifest-id="allowhtml.json"] + h2';
  const insertedTextAfterHeading = 'h2 + [data-manifest-id="allowhtml.json"]';
  const URL = `${baseURL}${features[1].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);

  await page.goto(URL);

  await test.step('0. verify the new "replace" (not the old "replaceContent")', async () => {
    await expect(text0.introHeadlineAlt).toHaveText('After: This is a new heading');
  });
  await test.step('1. verify the new "insertBefore" (not the old "insertContentBefore")', async () => {
    await expect(text1.textIntro).toContainText('After: insert before the heading');
    await expect(text1.introHeadlineAlt).toHaveText('Before: Insert before this heading');
    await expect(text1.textIntro.locator(insertedTextBeforeHeading)).toHaveCount(1);
  });
  await test.step('2. verify the new "insertAfter" (not the old "insertContentAfter")', async () => {
    await expect(text2.introHeadlineAlt).toHaveText('Before: Insert after this heading');
    await expect(text2.textIntro).toContainText('After: insert after the heading');
    await expect(text2.textIntro.locator(insertedTextAfterHeading)).toHaveCount(1);
  });
  await test.step('3. verify "prepend"', async () => {
    await expect(text3.introHeadlineAlt).toHaveText('After: prepend the headingBefore: Prepend this heading');
  });
  await test.step('4. verify "append"', async () => {
    await expect(text4.introHeadlineAlt).toHaveText('Before: Append this headingAfter:  append the heading');
  });
  await test.step('5. "replace" text with HTML', async () => {
    await expect(text5.introHeadlineAlt).toHaveText('After: replace with link to the homepage');
    await expect(text5.introHeadlineAlt.locator('a')).toHaveAttribute('href', 'https://adobe.com/');
  });
  await test.step('6. "insertBefore" with HTML', async () => {
    await expect(text6.textIntro).toContainText('After: insertBefore with link to the homepage');
    await expect(text6.introHeadlineAlt).toHaveText('Before: Insert Before this Heading with HTML');
    await expect(text6.textIntro.locator(insertedTextBeforeHeading)).toHaveCount(1);
    await expect(text6.textIntro.locator('a')).toHaveAttribute('href', 'https://adobe.com/');
  });
  await test.step('7. "insertAfter" with HTML', async () => {
    await expect(text7.introHeadlineAlt).toHaveText('Before: Insert After this Heading with HTML');
    await expect(text7.textIntro).toContainText('After: insertAfter with link to the homepage');
    await expect(text7.textIntro.locator(insertedTextAfterHeading)).toHaveCount(1);
    await expect(text7.textIntro.locator('a')).toHaveAttribute('href', 'https://adobe.com/');
  });
  await test.step('8. "prepend" with HTML', async () => {
    await expect(text8.introHeadlineAlt).toHaveText('After: prepend with link to the homepageBefore: prepend this heading with HTML');
    await expect(text8.textIntro.locator('a')).toHaveAttribute('href', 'https://adobe.com/');
  });
  await test.step('9. "append" with HTML', async () => {
    await expect(text9.introHeadlineAlt).toHaveText('Before: append this heading with HTMLAfter: append with link to the homepage');
    await expect(text9.textIntro.locator('a')).toHaveAttribute('href', 'https://adobe.com/');
  });
  await test.step('10. test new selector: primary-cta', async () => {
    await expect(marquee0.blueButton).not.toBeVisible();
  });
  await test.step('11. test new selector: secondary-cta', async () => {
    await expect(marquee1.outlineButton).not.toBeVisible();
  });
  await test.step('12. test new selector: action-area', async () => {
    await expect(marquee2.actionArea).not.toBeVisible();
  });
  await test.step('13. test #_href with primary-cta', async () => {
    await expect(marquee3.blueButton).toHaveAttribute('href', 'https://adobe.com/acrobat.html');
  });
});
