/* eslint-disable import/prefer-default-export */

import { test } from '@playwright/test';
import { AccessibilityError } from './customerrors.js';

const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Run accessibility test to meet legal compliance (WCAG 2.0/2.1 A & AA)
 * @param {Object} page - The page object.
 * @param {string} [testScope='body'] - Optional scope for the accessibility test. Default is the entire page ('body').
 * @param {string[]} [includeTags=['wcag2a', 'wcag2aa']] - Optional tags to include in the accessibility test. Default is WCAG 2.0/2.1 A & AA.
 * @param {number} [maxViolations=0] - Optional maximum number of allowed violations before the test fails. Default is 0 (any violation fails the test).
 * @param {boolean} [skipA11yTest=false] - If true, the test step is logged and skipped.
 */
async function runAccessibilityTest({
  page,
  testScope = 'body',
  includeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  maxViolations = 0,
  skipA11yTest = false,
} = {}) {
  if (skipA11yTest) {
    console.log(
      `[Skipping]: Accessibility test step skipped for this component ${testScope}`,
    );
    return;
  }

  let testName;
  try {
    // Retrive the test title (name)
    testName = test.info().title.includes(',')
      ? test.info().title.split(',')[0]
      : test.info().title;

    let scopeDescription = 'entire page';
    let testElement = testScope;

    let violationsDetails = '';

    // Handle a case where testScope is a string or locator from POM
    if (typeof testScope === 'string') {
      if (testScope === 'body') {
        testElement = 'body';
      } else {
        scopeDescription = `section: ${testScope}`;
      }
    } else if (
      typeof testScope === 'object'
      && testScope.constructor.name === 'Locator'
    ) {
      const eleHandle = await testScope.elementHandle();
      if (!eleHandle) {
        throw new AccessibilityError('Element not found for the given locator');
      }
      testElement = eleHandle;
      scopeDescription = `the provided locator: ${testScope}`;
    } else {
      scopeDescription = testScope === 'body' ? 'the entire page' : `section: ${testScope}`;
    }

    console.log('Scope description:', scopeDescription);
    // Run the Axe accessibility test on the given scope and tags
    const axe = await new AxeBuilder({ page })
      .withTags(includeTags)
      .include(testElement)
      .analyze();

    const enhancedAxeResults = {
      testName,
      testScope:
        testScope === 'body' ? 'Entire Page' : `Specific Section: ${testScope}`,
      ...axe,
    };

    const violationCount = enhancedAxeResults.violations.length;

    if (violationCount > maxViolations) {
      // Accessibility violations details
      violationsDetails += '\n========== Accessibility Test ==========\n';
      violationsDetails += `[Test Name    ]: ${testName}\n`;
      violationsDetails += `[Test Page URL]: ${page.url()}\n`;
      violationsDetails += `[Accessibility]: Running accessibility test on ${scopeDescription}\n`;

      enhancedAxeResults.violations.forEach((violation, index) => {
        violationsDetails += `[Result       ]: Accessibility test found ${violationCount} accessibility violation(s) for ${testName}\n`;
        violationsDetails += '[Violation Details]:\n';
        violationsDetails += `\n${index + 1}. Violation: ${
          violation.description
        }\n`;
        violationsDetails += `   - Axe Rule ID: ${violation.id}\n`;
        violationsDetails += `   - Severity: ${violation.impact}\n`;

        const wcagTags = Array.isArray(violation.tags)
          ? violation.tags.join(', ')
          : 'N/A';
        violationsDetails += `   - WCAG Tags: ${wcagTags}\n`;
        violationsDetails += '   - Nodes affected:\n';

        violation.nodes.forEach((node, nodeIndex) => {
          violationsDetails += `     ${nodeIndex + 1}. ${node.html}\n`;
        });
        violationsDetails += `   - Fix: ${violation.helpUrl}\n`;
      });

      // attached accessibility voilations details to test results
      await test.info().attach('Accessibility Test Results', {
        body: JSON.stringify(enhancedAxeResults, null, 2),
        contentType: 'application/json',
      });

      throw new AccessibilityError(
        `\nAccessibility test failed : ${violationCount} violation(s) found. \n ${violationsDetails}`,
      );
    } else if (violationCount > 0) {
      console.info(
        `[Accessibility Test]: Found ${violationCount} violation(s) for ${testName}, but under the threshold of ${maxViolations}.`,
      );
    } else {
      console.info(
        `[Accessibility Test]: No accessibility violations found for ${testName}.`,
      );
    }
  } catch (err) {
    throw new AccessibilityError(
      `[Accessibility Test failed for ${testName}].\n ${err.message}`,
    );
  }
}

export { runAccessibilityTest };
