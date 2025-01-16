import { fetchIcons } from '../../../features/icons/icons.js';
import { createTag, getConfig } from '../../../utils/utils.js';
import createCopy from '../library-utils.js';

export default async function iconList(content, list) {
  const config = getConfig();
  const icons = await fetchIcons(config);
  Object.keys(icons).forEach((key) => {
    const icon = createTag('span', { class: `icon icon-${key}` }, icons[key]);
    const titleText = createTag('p', { class: 'item-title' }, key);
    const title = createTag('li', { class: 'icon-item' }, icon);
    title.append(titleText);
    const copy = createTag('button', { class: 'copy' });
    copy.id = `${key}-icon-copy`;
    copy.addEventListener('click', (e) => {
      e.target.classList.add('copied');
      setTimeout(() => { e.target.classList.remove('copied'); }, 3000);
      const formatted = `:${key}:`;
      const blob = new Blob([formatted], { type: 'text/plain' });
      createCopy(blob);
    });
    title.append(copy);
    list.append(title);
  });
}
