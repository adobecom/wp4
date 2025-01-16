import { createTag } from '../../../utils/utils.js';
import createCopy from '../library-utils.js';

const categorize = (tagData, category) => tagData
  .reduce((tags, tag) => {
    const tagCategory = tag.category || category;
    tags[tagCategory] ??= [];
    tags[tagCategory].push({
      tagname: tag.tagname,
      description: tag.description,
    });
    return tags;
  }, {});

const fetchTags = async (path, category) => {
  const resp = await fetch(path);
  if (!resp.ok) return [];
  const json = await resp.json();
  return categorize(json.data, category);
};

const getCopyBtn = (tagName) => {
  const copy = createTag('button', { class: 'copy' });
  copy.id = `${tagName}-tag-copy`;
  copy.addEventListener('click', (e) => {
    e.target.classList.add('copied');
    setTimeout(() => { e.target.classList.remove('copied'); }, 3000);
    const blob = new Blob([tagName], { type: 'text/plain' });
    createCopy(blob);
  });
  return copy;
};

export default async function loadPersonalization(content, list) {
  let tagsObj = {};
  for (const item of content) {
    const { category, path } = item;
    tagsObj = {
      ...tagsObj,
      ...await fetchTags(path, category),
    };
  }

  list.textContent = '';

  Object.entries(tagsObj).forEach(([category, tags]) => {
    const titleTextEl = createTag('p', { class: 'item-title' }, category);
    const titleEl = createTag('li', { class: 'block-group' }, titleTextEl);
    list.append(titleEl);

    const tagListEl = createTag('ul', { class: 'block-group-list' });
    list.append(tagListEl);

    titleEl.addEventListener('click', () => {
      titleEl.classList.toggle('is-open');
    });

    tags.forEach((tag) => {
      const item = document.createElement('li');
      const name = document.createElement('p');
      name.textContent = tag.description;

      const copy = getCopyBtn(tag.tagname);
      item.append(name, copy);

      tagListEl.append(item);
    });
  });
}
