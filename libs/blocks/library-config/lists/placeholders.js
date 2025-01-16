import { createTag } from '../../../utils/utils.js';
import createCopy from '../library-utils.js';

async function fetchPlaceholders(path) {
  const resp = await fetch(path);
  if (!resp.ok) return [];
  const json = await resp.json();
  return json.data || [];
}

export default async function placeholderList(content, list) {
  const placeholders = await fetchPlaceholders(content[0].path);
  placeholders.forEach((placeholder) => {
    const titleText = createTag('p', { class: 'item-title' }, placeholder.value);
    const title = createTag('li', { class: 'placeholder' }, titleText);
    const copy = createTag('button', { class: 'copy' });
    copy.id = `${placeholder.value}-placeholder-copy`;
    copy.addEventListener('click', (e) => {
      e.target.classList.add('copied');
      setTimeout(() => { e.target.classList.remove('copied'); }, 3000);
      const formatted = `{{${placeholder.key}}}`;
      const blob = new Blob([formatted], { type: 'text/plain' });
      createCopy(blob);
    });
    title.append(copy);
    list.append(title);
  });
}
