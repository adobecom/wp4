import { createTag } from '../../utils/utils.js';

function isColor(str) {
  const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  const rgbRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
  return hexRegex.test(str) || rgbRegex.test(str);
}

function isGradient(str) {
  return str.startsWith('linear-gradient');
}

function isColorOrGradient(str) {
  return isColor(str) || isGradient(str);
}

function hasSegmentClass(el) {
  const segmentClassRegex = /^segment-timeline-(3-9|4-8|5-7|6-6|7-5|8-4|9-3)$/;
  const startsWithSegmentTimelineRegex = /^segment-timeline-/;
  let hasValidSegmentClass = Array.from(el.classList).some((cls) => segmentClassRegex.test(cls));
  if (!hasValidSegmentClass
    && Array.from(el.classList).some((cls) => startsWithSegmentTimelineRegex.test(cls))) {
    el.classList.add('segment-timeline-6-6');
    hasValidSegmentClass = true;
  }
  return hasValidSegmentClass;
}

function getColWidth(text, colWidths, hasSegment) {
  if (hasSegment || colWidths.length === 2) return;
  const numRegex = /\b\d{1,3}\b/;
  colWidths.push((text.match(numRegex) || [])[0]);
}
function createRow() {
  return [createTag('div', { class: 'row' }),
    createTag('div', { class: 'left' }),
    createTag('div', { class: 'right' }),
  ];
}
function createBars(index) {
  return index === 0
    ? [createTag('div', { class: 'bar' })] : [createTag('div', { class: 'bar' }), createTag('div', { class: 'bar' })];
}
function addBarRow() {
  const [barRow, left, right] = createRow();
  const sides = [left, right];
  sides.forEach((text, index) => {
    sides[index].append(...createBars(index));
    barRow.append(sides[index]);
  });
  return barRow;
}
function addBottomRow(periodText) {
  const [periodRow, left, right] = createRow();
  const sides = [left, right];
  periodText.forEach((text, index) => {
    sides[index].append(createTag('p', { class: 'period body-s' }, text));
    periodRow.append(sides[index]);
  });
  return periodRow;
}

function setBG(el, color) {
  el.style.background = color;
}

function updateForRTL(lgStr, el) {
  if (el.closest('[dir="rtl"]')) {
    return lgStr.replace(/to right|to left|90deg|180deg|turn 0.25|turn 0.75/g, (match) => {
      const converter = {
        'turn 0.25': 'turn 0.75',
        'turn 0.75': 'turn 0.25',
        '90deg': '180deg',
        '180deg': '90deg',
        'to right': 'to left',
        'to left': 'to right',
      };

      return converter[match];
    });
  }
  return lgStr;
}
function setColors(colors, fragment, el) {
  const barEls = fragment.querySelectorAll('.bar');
  const periodEls = fragment.querySelectorAll('.period');
  if (colors?.length === 2 && isColorOrGradient(colors[0]) && isColorOrGradient(colors[1])) {
    if (barEls.length === 3 || periodEls.length === 2) {
      const leftColor = colors[0];
      const rightColor = colors[1];
      let firstBar; let secondBar; let thirdBar;
      if (isGradient(leftColor)) {
        leftColor.split(' ').forEach((color) => {
          if (isColor(color) && !firstBar) {
            firstBar = color;
            setBG(barEls[0], firstBar);
          } else if (isColor(color)) {
            secondBar = color;
            setBG(barEls[1], secondBar);
          }
        });
      } else {
        setBG(barEls[0], leftColor);
        setBG(barEls[1], leftColor);
      }
      if (isGradient(rightColor)) {
        leftColor.split(' ').forEach((color) => {
          if (isColor(color) && !thirdBar) {
            thirdBar = color;
            setBG(barEls[2], thirdBar);
          }
        });
      } else {
        setBG(barEls[2], rightColor);
      }
      setBG(periodEls[0], updateForRTL(leftColor, el));
      setBG(periodEls[1], updateForRTL(rightColor, el));
    }
  }
}

function colWidthsNotValid(colWidths) {
  return (colWidths.length !== 2 || colWidths.some((value) => Number.isNaN(value)));
}
function updateColWidths(colWidths, fragment, hasSegment) {
  if (colWidthsNotValid(colWidths) || hasSegment) return;
  const total = Number(colWidths[0]) + Number(colWidths[1]);
  const right = Math.floor((Number(colWidths[1]) / total) * 10000) / 100;
  const colString = `1fr minmax(${String(right)}%, 150px)`;
  fragment.querySelectorAll('.row').forEach((row) => {
    row.style.gridTemplateColumns = colString;
  });
}
export default function init(el) {
  const fragment = document.createDocumentFragment();
  const [textRow, left, right] = createRow();
  const rows = el.querySelectorAll(':scope > div > div');
  const colors = []; const periodText = []; const colWidths = [];
  const hasSegment = hasSegmentClass(el);
  rows.forEach((row, index) => {
    const side = index === 0 ? left : right;
    const color = row.firstElementChild?.textContent?.trim();
    const p = row.querySelector(':scope > p:last-child');
    if (p) {
      const [text, period] = p.textContent.trim().split('|');
      if (period) {
        periodText.push(period.trim());
        getColWidth(period, colWidths, hasSegment);
      }
      if (text) {
        p.textContent = text.trim();
      }
    }

    if (isColorOrGradient(color)) {
      colors.push(color);
      row.firstElementChild.remove();
    }
    row.parentElement.remove();
    if (index === 1 && hasSegment) {
      const mobileCenterLeft = row.cloneNode(true);
      mobileCenterLeft.classList.add('left-center');
      left.append(mobileCenterLeft);
      row.classList.add('right-center');
    }
    side.append(row);
  });
  textRow.append(left, right);
  [textRow, addBarRow(), addBottomRow(periodText)].forEach((row) => fragment.append(row));
  updateColWidths(colWidths, fragment, hasSegment);
  setColors(colors, fragment, el);
  el.append(fragment);
}
