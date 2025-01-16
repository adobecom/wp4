import { createTag } from '../../utils/utils.js';

function makeGotoSteps(link, linkText) {
  const goToAnchor = createTag('a', { href: link, target: '_blank', rel: 'noopener noreferrer' }, linkText);
  return goToAnchor;
}

export default function init(el) {
  el.classList.add('missing-details');
  const heading = createTag('h2', null, 'Missing project details');
  const paragraph = createTag('p', null, 'The project details were removed after you logged in. To resolve this:');
  const steps = createTag('ol', null);
  const gotoSteps = createTag('ul', null);
  const gotoURls = [{ link: 'https://milostudio.adobe.com', linkText: 'Production' }, { link: 'https://milostudio.stage.adobe.com', linkText: 'Stage' }, { link: 'https://milostudio.dev.adobe.com', linkText: 'Development' }];
  const goToContainer = createTag('div', { class: 'goto-step' });
  gotoURls.forEach((gotoUrl) => gotoSteps.append(createTag('li', null, makeGotoSteps(gotoUrl.link, gotoUrl.linkText))));
  goToContainer.append(createTag('p', null, 'Please navigate to the respective MiloStudio environment:'));
  goToContainer.append(gotoSteps);
  const stepsList = ['Close this window or tab.', goToContainer, 'Select the tenant.', 'Click on Localization.', 'Click on "Add New Project".'];
  stepsList.forEach((step) => steps.append(createTag('li', null, step)));
  el.append(heading, paragraph, steps);
}
