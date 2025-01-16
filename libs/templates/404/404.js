import { getConfig, createTag, loadArea, getMetadata } from '../../utils/utils.js';
import { sampleRUM } from '../../utils/samplerum.js';

const { base, contentRoot, locale } = getConfig();

async function get404(path) {
  const { prefix } = locale;
  const href = path || `${base}${prefix}/fragments/404#_dnt`;
  const para = createTag('p', {}, createTag('a', { href }, href));
  const section = createTag('div', null, para);

  const main = document.body.querySelector('main');
  main.append(section);
  await loadArea(main);
  import('../../martech/attributes.js').then((analytics) => {
    document.querySelectorAll('main > div').forEach((area, idx) => analytics.decorateSectionAnalytics(area, idx));
  });
}

async function getLegacy404() {
  const { body } = document;
  body.classList.remove('404');
  body.classList.add('legacy-404');
  const main = body.querySelector('main');
  if (!main) return;
  main.innerHTML = '';
  let resp = await fetch(`${locale.contentRoot}/404.plain.html`);
  if (!resp || !resp.ok) {
    const root = contentRoot || '';
    resp = await fetch(`${root}/404.plain.html`);
  }
  const columns = createTag('div', { class: 'columns-404' });
  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // picture for background img
  const picture = doc.querySelector('picture');
  picture.classList.add('bg-img');

  // sections
  const sections = doc.querySelectorAll('body > div');
  const header = [...sections].shift();
  header.classList.add('header-404', 'section');
  sections.forEach((section) => {
    if (section.querySelector('ul')) {
      if (section.querySelectorAll('li').length > 5) {
        section.classList.add('split-items');
      }
      section.classList.add('column');
      columns.append(section);
    } else {
      section.classList.add('section');
    }
  });

  // appending background img, header, columns
  main.append(picture, header, columns);
  header.querySelector('p').remove();

  // appending other sections to main
  main.append(...doc.querySelectorAll('body > *'));
}

export default async function init() {
  const root = contentRoot || '';
  const style = getMetadata('404');
  if (style === 'feds') await get404();
  if (style === 'local') await get404(`${root}/fragments/404`);
  if (!style) await getLegacy404();
  sampleRUM('404', { source: document.referrer });
}

(async () => {
  await init();
})();
