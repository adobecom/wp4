import { createIntersectionObserver, createTag, loadScript } from '../../utils/utils.js';

export default function init(a) {
  if (a.parentElement.firstChild.nodeType === Node.TEXT_NODE) return;
  const embedInstagram = async () => {
    const anchor = createTag('a', { href: a.href });
    const blockquote = createTag('blockquote', { class: 'instagram-media', 'data-instgrm-captioned': '' }, anchor);
    const wrapper = createTag('div', { class: 'embed-instagram' }, blockquote);
    a.parentElement.replaceChild(wrapper, a);

    loadScript('https://www.instagram.com/embed.js');
  };

  createIntersectionObserver({ el: a, callback: embedInstagram });
}
