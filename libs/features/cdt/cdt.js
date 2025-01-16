import { getMetadata, getConfig, createTag, getMepEnablement } from '../../utils/utils.js';
import getPromoManifests from '../personalization/promo-utils.js';
import { replaceKey } from '../placeholders.js';

function loadCountdownTimer(
  container,
  cdtLabel,
  cdtDays,
  cdtHours,
  cdtMins,
  timeRangesEpoch,
) {
  let isVisible = false;
  let interval;
  const oneMinuteinMs = 60000;

  const instant = new URL(window.location.href)?.searchParams?.get('instant');
  let currentTime = instant ? Date.parse(instant) : Date.now();

  function appendTimerBox(parent, value, label) {
    const fragment = createTag('div', { class: 'timer-fragment' }, null, { parent });
    const unitContainer = createTag('div', { class: 'timer-unit-container' }, null, { parent: fragment });
    createTag('div', { class: 'timer-unit-label' }, label, { parent: fragment });

    createTag('div', { class: 'timer-box' }, Math.floor(value / 10).toString(), { parent: unitContainer });
    createTag('div', { class: 'timer-box' }, (value % 10).toString(), { parent: unitContainer });
  }

  function appendSeparator(parent) {
    createTag('div', { class: 'timer-separator' }, ':', { parent });
  }

  function appendTimerBlock(parent, daysLeft, hoursLeft, minutesLeft) {
    const timerBlock = createTag('div', { class: 'timer-block' }, null, { parent });
    appendTimerBox(timerBlock, daysLeft, cdtDays);
    appendSeparator(timerBlock);
    appendTimerBox(timerBlock, hoursLeft, cdtHours);
    appendSeparator(timerBlock);
    appendTimerBox(timerBlock, minutesLeft, cdtMins);
  }

  function appendTimerLabel(parent, label) {
    createTag('div', { class: 'timer-label' }, label, { parent });
  }

  function removeCountdown() {
    container.replaceChildren();
  }

  function render(daysLeft, hoursLeft, minutesLeft) {
    if (!isVisible) return;

    removeCountdown();

    appendTimerLabel(container, cdtLabel);
    appendTimerBlock(container, daysLeft, hoursLeft, minutesLeft);
  }

  function updateCountdown() {
    for (let i = 0; i < timeRangesEpoch.length; i += 2) {
      const startTime = timeRangesEpoch[i];
      const endTime = timeRangesEpoch[i + 1];

      if (currentTime >= startTime && currentTime <= endTime) {
        isVisible = true;
        const diffTime = endTime - currentTime;
        const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        render(daysLeft, hoursLeft, minutesLeft);
        currentTime += oneMinuteinMs;
        return;
      }
    }

    isVisible = false;
    clearInterval(interval);
    removeCountdown();
  }

  function startCountdown() {
    updateCountdown();
    interval = setInterval(updateCountdown, oneMinuteinMs);
  }

  startCountdown();
}

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function getCDTTimeRange() {
  const promoEnabled = getMepEnablement('manifestnames', 'promo');
  const PAGE_URL = new URL(window.location.href);
  const persManifests = getPromoManifests(promoEnabled, PAGE_URL.searchParams);
  let cdtMetadata = null;
  persManifests?.forEach((manifest) => {
    if (manifest.disabled) return;
    if (!manifest.event.cdtStart || !manifest.event.cdtEnd) return;

    cdtMetadata = `${manifest.event.cdtStart},${manifest.event.cdtEnd}`;
  });

  if (!cdtMetadata) {
    cdtMetadata = getMetadata('countdown-timer');
    if (cdtMetadata === null) {
      throw new Error('Metadata for countdown-timer is not available');
    }
  }

  const cdtRange = cdtMetadata.split(',');
  if (cdtRange.length % 2 !== 0) {
    throw new Error('Invalid countdown timer range');
  }

  const timeRangesEpoch = cdtRange.map((time) => {
    const parsedTime = Date.parse(time?.trim());
    return Number.isNaN(parsedTime) ? null : parsedTime;
  });

  if (timeRangesEpoch.includes(null)) {
    throw new Error('Invalid format for countdown timer range');
  }

  return timeRangesEpoch;
}

export default async function initCDT(el, classList) {
  const placeholders = ['cdt-ends-in', 'cdt-days', 'cdt-hours', 'cdt-mins'];
  const [cdtLabel, cdtDays, cdtHours, cdtMins] = await Promise.all(
    placeholders.map((placeholder) => replaceKey(placeholder, getConfig())),
  );

  const timeRangesEpoch = getCDTTimeRange();
  const cdtDiv = createTag('div', { class: 'countdown-timer' }, null, { parent: el });
  cdtDiv.classList.add(isMobile() ? 'vertical' : 'horizontal');
  if (classList.contains('dark')) cdtDiv.classList.add('dark');
  if (classList.contains('center')) cdtDiv.classList.add('center');

  loadCountdownTimer(cdtDiv, cdtLabel, cdtDays, cdtHours, cdtMins, timeRangesEpoch);
}
