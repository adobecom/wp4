import { createTag } from '../../utils/utils.js';

const WAFFLE_ICON = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" focusable="false" class="spectrum-Icon spectrum-Icon--sizeS"><path d="M10 10H2V3a1 1 0 0 1 1-1h7zm4-8h8v8h-8zm20 8h-8V2h7a1 1 0 0 1 1 1zM2 14h8v8H2zm12 0h8v8h-8zm12 0h8v8h-8zM10 34H3a1 1 0 0 1-1-1v-7h8zm4-8h8v8h-8zm19 8h-7v-8h8v7a1 1 0 0 1-1 1z"></path></svg>';

function decorateAppsMenu(profileEl, appsDom, toggle) {
  const appsNavItem = createTag('div', { class: 'gnav-navitem app-launcher has-menu', 'da-ll': 'App Launcher' });
  const appsUl = createTag('ul', { class: 'apps' });
  const appsDropDown = createTag('div', { id: 'navmenu-apps', class: 'app-menu gnav-navitem-menu' }, appsUl);
  const appButton = createTag(
    'button',
    {
      class: 'gnav-applications-button',
      'aria-expanded': false,
      'aria-controls': 'navmenu-apps',
      'daa-ll': 'App Launcher',
      'daa-lh': 'header|Open',
    },
    WAFFLE_ICON,
  );

  appsDom.forEach((li, idx) => {
    const image = li.querySelector('picture');
    const anchor = li.querySelector('a');
    const title = anchor?.textContent;
    const link = createTag('a', {
      class: 'link-block',
      href: anchor.href,
      role: 'link',
      'aria-label': title,
      'daa-ll': `${title}-${idx + 1}`,
      rel: 'noopener',
      target: '_blank',
    });

    li.replaceChildren();
    link.append(image, title);
    li.appendChild(link);
    appsUl.append(li);
  });

  appButton.addEventListener('click', () => { toggle(appsNavItem); });
  appsDropDown.append(appsUl);
  appsNavItem.append(appButton, appsDropDown);
  profileEl.after(appsNavItem);
  return appsNavItem;
}

export default async function getApps(profileEl, appLauncherBlock, toggle) {
  const gnav = profileEl.closest('nav.gnav');
  gnav.classList.add('has-apps');

  const appsLink = appLauncherBlock.querySelector('a');

  const path = appsLink.href;
  const resp = await fetch(`${path}.plain.html`);
  if (!resp.ok) return null;

  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const appsDom = doc.querySelectorAll('body > div > ul > li');
  return decorateAppsMenu(profileEl, appsDom, toggle);
}
