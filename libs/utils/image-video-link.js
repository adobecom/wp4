import { getConfig, loadStyle, createTag } from './utils.js';

const PLAY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42" fill="none" class="play-icon" aria-hidden="true">
                        <path d="M36.8084 15.6746L8.93018 0.728828C4.89238 -1.43591 0 1.48158 0 6.05422V35.9458C0 40.5184 4.89238 43.4359 8.93018 41.2712L36.8084 26.3253C41.0639 24.0439 41.0638 17.956 36.8084 15.6746Z" fill="white"/>
                      </svg>`;

export default function init(el, a, btnFormat) {
  const { miloLibs, codeRoot } = getConfig();
  const base = miloLibs || codeRoot;
  loadStyle(`${base}/styles/consonant-play-button.css`);

  const playBtnFormat = btnFormat.split(':')[1];
  const btnSize = playBtnFormat.includes('-') ? `btn-${playBtnFormat.split('-')[1]}` : 'btn-large';
  const pic = el.querySelector('picture');
  const playIcon = createTag('div', { class: 'play-icon-container' }, PLAY_ICON_SVG);
  const imgLinkContainer = createTag('span', { class: 'modal-img-link' });
  el.insertBefore(imgLinkContainer, pic);
  if (btnSize) a.classList.add(btnSize);
  a.classList.add('consonant-play-btn');
  a.setAttribute('aria-label', 'play');
  a.append(playIcon);
  imgLinkContainer.append(pic, a);
}
