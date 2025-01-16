import { decorateAnchorVideo } from '../../utils/decorate.js';

export default function init(a) {
  a.classList.add('hide-video');
  const bgBlocks = ['aside', 'marquee', 'hero-marquee'];
  if (a.href.includes('.mp4') && bgBlocks.some((b) => a.closest(`.${b}`))) {
    a.classList.add('hide');
    if (!a.parentNode) return;
    decorateAnchorVideo({
      src: a.href,
      anchorTag: a,
    });
  } else {
    const embed = `<div class="milo-video">
      <iframe src="${a.href}" class="adobetv" webkitallowfullscreen mozallowfullscreen allowfullscreen scrolling="no" allow="encrypted-media" title="Adobe Video Publishing Cloud Player" loading="lazy">
      </iframe>
    </div>`;
    a.insertAdjacentHTML('afterend', embed);
    a.remove();
  }
}
