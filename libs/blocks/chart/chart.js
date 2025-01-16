import { loadScript, getConfig, createTag, customFetch } from '../../utils/utils.js';
import {
  throttle,
  parseValue,
  hasPropertyCI,
  propertyNameCI,
  propertyValueCI,
  formatExcelDate,
} from './utils.js';
import getTheme from './chartLightTheme.js';

export const SMALL = 'small';
export const MEDIUM = 'medium';
export const LARGE = 'large';
export const DESKTOP_BREAKPOINT = 1200;
export const TABLET_BREAKPOINT = 600;
export const colorPalette = {
  seafoam: '#0FB5AE',
  indigo: '#4046CA',
  orange: '#F68511',
  magenta: '#DE3D82',
  lavender: '#7E84FA',
  lime: '#72E06A',
  blue: '#147AF3',
  purple: '#7326D3',
  yellow: '#E8C600',
  copper: '#CB5D00',
  green: '#008F5D',
  chartreuse: '#BCE931',
};
const SECTION_CLASSNAME = 'chart-section';
const chartTypes = [
  'bar',
  'column',
  'line',
  'area',
  'list',
  'donut',
  'pie',
  'oversized-number',
];

export function processDataset(data) {
  const dataset = {};
  const optionalHeaders = ['unit', 'group', 'color', 'subheading'];
  const headers = data?.[0];
  const unitKey = headers ? propertyNameCI(headers, 'unit') : null;
  const units = headers?.[unitKey]?.split('-') || [''];
  const cleanHeaders = Object.keys(headers).filter((header) => (
    !optionalHeaders.includes(header.toLowerCase())
  ));
  dataset.source = [cleanHeaders];

  // Use headers to set source
  data.forEach((element) => {
    let values = [];

    if (units[0] === 'date') {
      values = cleanHeaders.map((column, index) => (
        index ? parseValue(element[column]) : formatExcelDate(element[column])
      ));
    } else {
      values = cleanHeaders.map((column) => parseValue(element[column]));
    }

    dataset.source.push(values);
  });

  return { dataset, headers, units };
}

export function processMarkData(series, xUnit) {
  const seriesOptions = series.reduce((options, mark) => {
    options[mark.Type] ??= { data: [] };

    const markData = options[mark.Type].data;
    const split = mark.Value?.split('-');
    const value = xUnit === 'date' && mark.Axis === 'xAxis' ? formatExcelDate(split[0]) : parseValue(split[0]);
    const markObject = {
      ...(mark.Name ? { name: mark.Name } : {}),
      ...(mark.Axis ? { [mark.Axis]: value } : {}),
    };

    if (mark.Type === 'markArea') {
      markData[0] ??= [];
      markData[0].push(markObject);

      if (split.length > 1) {
        const endRangeValue = xUnit === 'date' && mark.Axis === 'xAxis' ? formatExcelDate(split[1]) : parseValue(split[1]);

        markData[0].push((mark.Axis ? { [mark.Axis]: endRangeValue } : {}));
      }
    } else {
      markData.push(markObject);
    }

    return options;
  }, {});

  if (seriesOptions.markLine) {
    seriesOptions.markLine.label = {
      show: false,
      formatter: '{b}',
      position: 'insideStartBottom',
    };
    seriesOptions.markLine.emphasis = { label: { show: true } };
  }

  if (seriesOptions.markArea) {
    seriesOptions.markArea.label = { show: false };
    seriesOptions.markArea.emphasis = {
      label: {
        show: true,
        position: 'top',
        distance: 0,
      },
    };
  }

  return seriesOptions;
}

export async function fetchData(link) {
  const resp = await customFetch({ resource: link.href.toLowerCase(), withCacheRules: true })
    .catch(() => ({}));

  if (!resp.ok) return {};

  const json = await resp.json();
  return json;
}

export function chartData(json) {
  const data = {};
  // Check the type of data
  if (json[':type'] === 'multi-sheet') {
    const dataSheet = json[':names'].includes('data') ? 'data' : json[':names'].shift();
    const seriesSheet = json[':names'].filter((name) => name !== 'data').shift();
    data.data = json[dataSheet]?.data;
    data.series = json[seriesSheet]?.data;
  } else {
    data.data = json.data;
    data.series = [];
  }
  return data;
}

export const barTooltipFormatter = ({
  seriesName,
  marker,
  value,
  encode: { x = [] },
  name,
} = {}, unit = '') => (
  `${seriesName}<br />${marker} ${value[x[0]]}${unit} ${name}<i class="tooltip-icon"></i>`
);

export const donutTooltipFormatter = ({
  marker,
  data,
  encode: { value = [] },
  name,
  percent,
} = {}, unit = '') => (
  `${marker} ${name}<br />${data[value[0]]}${unit}${unit !== '%' ? ` ${percent}%` : ''}<i class="tooltip-icon"></i>`
);

export const pieTooltipFormatter = ({
  marker,
  data,
  encode: { value = [] },
  name,
} = {}, unit = '') => (
  `${name}<br />${marker} ${data[value[0]]}${unit}<i class="tooltip-icon"></i>`
);

export const tooltipFormatter = (params, units) => {
  const hasUnit2 = typeof units[1] !== 'undefined';
  let tooltip = params[0].name;
  params.forEach(({
    marker,
    value,
    encode: { y = [] },
    seriesName,
    seriesIndex,
  } = {}) => {
    const unit = hasUnit2 ? units[seriesIndex] : units[0];
    tooltip += `<br />${marker} ${value[y[0]]}${unit} ${seriesName}`;
  });
  tooltip += '<i class="tooltip-icon"></i>';
  return tooltip;
};

export const barSeriesOptions = (chartType, hasOverride, dimensions, colors, size, yUnits) => {
  const isLarge = size === LARGE;
  const isBar = chartType === 'bar';

  return dimensions.map((value, index) => ({
    type: 'bar',
    name: value,
    label: {
      show: isBar,
      formatter: `{@[${index + 1}]}${yUnits[0]}`,
      position: 'right',
      textBorderColor: '#000',
      distance: 8,
      fontSize: isLarge ? 16 : 14,
    },
    colorBy: hasOverride ? 'data' : 'series',
    showBackground: isBar,
    backgroundStyle: {
      color: colors[index],
      borderRadius: 3,
      opacity: 0.35,
    },
    itemStyle: { borderRadius: 3 },
    barCategoryGap: isBar ? 0 : '33.3%',
    barGap: '33.3%',
    yAxisIndex: typeof yUnits[1] !== 'undefined' ? index : 0,
  }));
};

export const lineSeriesOptions = (series, dimensions, xUnit, yUnits) => {
  const marks = processMarkData(series, xUnit);

  return dimensions.map((value, index) => {
    let options = {
      name: value,
      type: 'line',
      symbol: 'none',
      lineStyle: { width: 3 },
      yAxisIndex: typeof yUnits[1] !== 'undefined' ? index : 0,
    };

    if (index === 0 && marks) {
      options = { ...options, ...marks };
    }

    return options;
  });
};

export const areaSeriesOptions = (dimensions) => (
  dimensions.map((value) => ({
    type: 'line',
    name: value,
    symbol: 'none',
    areaStyle: { opacity: 1 },
    stack: 'area',
  }))
);

const donutTitleFormatter = (label, unit = '', title = '') => [`{a|${label?.toLocaleString()}${unit}}`, `{b|${title}}`].join('\n');

export const setDonutTitle = (chart, label, unit = '', title = '') => {
  chart.setOption({ title: { text: donutTitleFormatter(label, unit, title) } });
};

export const handleDonutSelect = (source, selected, chart, unit, title) => {
  const selectedSum = source.reduce((total, current) => {
    if (selected[current[1]]) return total + current[0];
    return total;
  }, 0);
  setDonutTitle(chart, selectedSum, unit, title);

  return selectedSum;
};

export const donutTitleOptions = (source, seriesData, unit, size) => {
  // Remove header names
  const sourceData = (source && source[0].every((i) => typeof i === 'string')) ? source.slice(1) : source;
  const sum = sourceData?.reduce((total, current) => total + current[0], 0);
  const firstSeries = seriesData?.[0];
  const title = firstSeries ? propertyValueCI(firstSeries, 'title') : '';
  const sizeLarge = size === LARGE;
  const sizeSmall = size === SMALL;

  return {
    show: true,
    left: 'center',
    bottom: sizeSmall ? '48%' : '46%',
    text: donutTitleFormatter(sum, unit, title),
    textStyle: {
      rich: {
        a: {
          fontSize: sizeLarge ? 64 : 44,
          lineHeight: sizeLarge ? 80 : 55,
          fontWeight: 'bolder',
        },
        b: {
          fontSize: sizeLarge ? 28 : 20,
          lineHeight: sizeLarge ? 32 : 30,
          fontWeight: sizeLarge ? 'bold' : 'normal',
        },
      },
      color: '#000',
    },
  };
};

export const donutSeriesOptions = (size) => [{
  type: 'pie',
  radius: ['70%', '90%'],
  avoidLabelOverlap: true,
  height: size === SMALL ? '90%' : 'auto',
  silent: false,
  label: { show: false },
  labelLine: { show: false },
  emphasis: { label: { show: false } },
  center: ['50%', '46%'],
}];

export const pieSeriesOptions = (size) => {
  const isSmall = size === SMALL;

  return [{
    type: 'pie',
    radius: isSmall ? '90%' : '80%',
    height: isSmall ? '90%' : 'auto',
    silent: false,
    label: {
      show: !isSmall,
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#2c2c2c',
      bleedMargin: 0,
    },
    labelLine: {
      length: 10,
      length2: 10,
    },
    center: ['50%', '46%'],
  }];
};

/**
 * Returns object of echart options
 * @param {string} chartType
 * @param {object} processedData
 * @param {object} series
 * @param {string} size
 * @param {array} colors
 * @param {integer} labelDeg
 * @returns {object}
 */
export const getChartOptions = ({
  chartType,
  processedData: { dataset, headers, units = [''] } = {},
  series,
  size,
  colors,
  labelDeg = 0,
}) => {
  const hasOverride = headers ? hasPropertyCI(headers, 'color') : false;
  const source = dataset?.source;
  const dimensions = source?.[0]?.slice() || [];
  const isBar = chartType === 'bar';
  const isColumn = chartType === 'column';
  const isPie = chartType === 'pie';
  const isDonut = chartType === 'donut';
  const isDiagonalLabel = labelDeg > 0;
  let xUnit = '';
  let yUnits = units;

  if (units[0] === 'date') {
    [xUnit] = units;
    yUnits = units.length > 1 ? units.slice(1) : [''];
  }

  dimensions.shift();

  let bottomGrid = 90;

  if (size === LARGE) {
    if (isDiagonalLabel) {
      bottomGrid = 30;
    } else {
      bottomGrid = 60;
    }
  } else if (isDiagonalLabel) {
    bottomGrid = 40;
  }

  return {
    dataset,
    color: colors,
    legend: {
      show: true,
      inactiveColor: '#6C6C6C',
      type: 'scroll',
    },
    aria: {
      enabled: true,
      label: {
        general: { withTitle: 'This is a chart' },
        series: {
          maxCount: 1,
          multiple:
          {
            prefix: '. It consists of {seriesCount} series count ',
            withName: `with series ${dimensions.join(', ')}. `,
          },
        },
        data: { separator: { middle: `${yUnits}, `, end: yUnits } },
      },
    },
    title: isDonut ? donutTitleOptions(source, series, yUnits[0], size) : {},
    tooltip: {
      show: true,
      formatter: ((params) => {
        if (isBar) return barTooltipFormatter(params, yUnits[0]);
        if (isPie) return pieTooltipFormatter(params, yUnits[0]);
        if (isDonut) return donutTooltipFormatter(params, yUnits[0]);
        return tooltipFormatter(params, yUnits);
      }),
      trigger: isBar || isPie || isDonut ? 'item' : 'axis',
      axisPointer: { type: isColumn ? 'none' : 'line' },
    },
    grid: { bottom: bottomGrid },
    xAxis: {
      type: isBar ? 'value' : 'category',
      axisLabel: {
        show: !isBar,
        rotate: labelDeg,
      },
      axisTick: { show: !isBar },
      max: (value) => {
        if (!isBar) return null;
        // This adds extra space on xAxis so labels will fit
        const extraSpace = 1;
        return Math.ceil((value.max + (value.max * extraSpace)) / 10) * 10;
      },
      boundaryGap: isColumn,
    },
    yAxis: (() => (
      yUnits.map((unit) => (
        {
          type: isBar ? 'category' : 'value',
          axisLabel: {
            show: !isBar,
            formatter: (params) => `${params}${unit}`,
            padding: 0,
          },
          axisTick: { show: !isBar },
          alignTicks: true,
        }
      ))
    ))(),
    series: (() => {
      if (isBar || isColumn) {
        return barSeriesOptions(chartType, hasOverride, dimensions, colors, size, yUnits);
      }
      if (chartType === 'line') return lineSeriesOptions(series, dimensions, xUnit, yUnits);
      if (chartType === 'area') return areaSeriesOptions(dimensions);
      if (isDonut) return donutSeriesOptions(size);
      if (isPie) return pieSeriesOptions(size);
      return [];
    })(),
  };
};

const setDonutListeners = (chart, source, seriesData, units = []) => {
  // Remove header names
  const sourceData = (source && source[0].every((i) => typeof i === 'string')) ? source.slice(1) : source;
  const sum = sourceData?.reduce((total, current) => total + current[0], 0);
  const firstSeries = seriesData?.[0];
  const title = firstSeries ? propertyValueCI(firstSeries, 'title') : '';
  let mouseOutValue = sum;

  chart.on('mouseover', (value) => setDonutTitle(chart, value?.data?.[0], units?.[0], title));
  chart.on('mouseout', () => setDonutTitle(chart, mouseOutValue, units?.[0], title));
  chart.on('legendselectchanged', ({ selected }) => { mouseOutValue = handleDonutSelect(sourceData, selected, chart, units?.[0], title); });
};

const initChart = ({
  chartWrapper, chartType, data, series, size, ...rest
}) => {
  const themeName = getTheme(size);
  const options = { chartType, processedData: data, series, size, ...rest };
  const chartOptions = getChartOptions(options);
  const chart = window.echarts?.init(chartWrapper, themeName, { renderer: 'svg' });

  chartWrapper.tabIndex = 0;
  chartWrapper.role = 'img';
  chart.setOption(chartOptions);

  if (chartType === 'donut') {
    setDonutListeners(chart, data.dataset?.source, series, data.units);
  }

  return chart;
};

const handleIntersect = (options) => (entries, observer) => {
  if (!Array.isArray(entries)) return;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      initChart(options);
      observer.unobserve(entry.target);
    }
  });
};

export const getColors = (authoredColor) => {
  const colorList = Object.values(colorPalette);

  if (!authoredColor || !Object.hasOwnProperty.call(colorPalette, authoredColor)) return colorList;

  const colorIndex = colorList.indexOf(colorPalette[authoredColor]);

  return colorList.concat(colorList.splice(0, colorIndex));
};

export const getOverrideColors = (authoredColor, data) => data.map((row) => {
  const overrideColor = propertyValueCI(row, 'color');

  return colorPalette[overrideColor || authoredColor] || Object.values(colorPalette)[0];
});

export const getResponsiveSize = (authoredSize) => {
  const width = window.innerWidth;
  let size = LARGE;

  if (width < TABLET_BREAKPOINT || authoredSize === SMALL) {
    size = SMALL;
  } else if (width < DESKTOP_BREAKPOINT || authoredSize === MEDIUM) {
    size = MEDIUM;
  }

  return size;
};

export const getLabelDegree = (chartStyles, isDesktop) => {
  let diagonal = false;

  if (isDesktop) {
    diagonal = [...chartStyles]?.includes('desktop-diagonal-labels');
  } else {
    diagonal = [...chartStyles]?.includes('mobile-diagonal-labels');
  }

  return diagonal ? 60 : 0;
};

/* c8 ignore next 31 */
const handleResize = (el, authoredSize, chartType, data, series, colors) => {
  const currentSize = getResponsiveSize(authoredSize);
  const previousSize = el.getAttribute('data-responsive-size');
  const chartWrapper = el.querySelector('.chart-wrapper');
  const chartInstance = window.echarts?.getInstanceByDom(chartWrapper);
  const previousDevice = el.getAttribute('data-device');
  const width = window.innerWidth;
  let currentDevice = 'mobile';
  let isDesktop = false;

  if (width >= DESKTOP_BREAKPOINT) {
    currentDevice = 'desktop';
    isDesktop = true;
  }

  if (currentSize !== previousSize) {
    el.setAttribute('data-responsive-size', currentSize);
  }

  if (currentDevice !== previousDevice) {
    const chartStyles = el.classList;
    const labelDeg = getLabelDegree(chartStyles, isDesktop);

    el.setAttribute('data-device', currentDevice);
    chartInstance?.dispose();
    initChart({
      chartWrapper, chartType, data, series, colors, size: currentSize, labelDeg,
    });
  } else {
    chartInstance?.resize();
  }
};

export const getOversizedNumberSize = (charLength) => {
  let fontSize = 240; // max font size, for 1 char
  let titleY = 60; // vertical alignment by percent
  let subtitleY = 70; // vertical alignment by percent

  if (charLength > 0 && charLength <= 6) {
    // Decrease the font size by 30 for every additional character
    fontSize -= 30 * (charLength - 1);
  } else {
    fontSize = 90;
  }

  // Reduce the vertical spacing for small font sizes
  if (fontSize <= 100) {
    titleY -= 5;
    subtitleY -= 5;
  }

  return [fontSize, titleY, subtitleY];
};

const init = (el) => {
  const children = el.querySelectorAll(':scope > div');
  const chartContainer = children[2];
  const chartWrapper = chartContainer?.querySelector(':scope > div');
  children[0]?.classList.add('title');
  children[1]?.classList.add('subtitle');
  chartContainer?.classList.add('chart-container');
  children[3]?.classList.add('footnote');
  chartWrapper?.classList.add('chart-wrapper');

  const chartStyles = el.classList;
  const section = el.parentElement?.matches('.section') ? el.parentElement : null;
  const sectionChildren = section?.querySelectorAll(':scope > div:not(.section-metadata)');
  const upNumber = sectionChildren?.length;
  section?.classList.add(`up-${upNumber}`);
  section?.classList.add(SECTION_CLASSNAME);

  let authoredSize = SMALL;
  if (upNumber === 1) authoredSize = LARGE;
  if (upNumber === 2) authoredSize = MEDIUM;

  const size = getResponsiveSize(authoredSize);
  el.classList.add(authoredSize);
  el.setAttribute('data-responsive-size', size);

  const chartType = chartTypes?.find((type) => el.className?.indexOf(type) !== -1);
  const dataLink = chartWrapper?.querySelector('a[href$="json"]');

  dataLink?.remove();

  if (!chartType || !chartWrapper || !dataLink) return;

  const authoredColor = Array.from(chartStyles)?.find((style) => style in colorPalette);
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  const labelDeg = getLabelDegree(chartStyles, isDesktop);

  if (chartType === 'list') {
    // Must use chained promise. Await will cause loading issues
    Promise.all([fetchData(dataLink), import('./list.js')])
      .then(([json, { default: initList }]) => {
        initList(chartWrapper, json, colorPalette[authoredColor]);
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log('Error loading script:', error));
    return;
  }

  if (chartType === 'oversized-number') {
    // Must use chained promise. Await will cause loading issues
    fetchData(dataLink)
      .then((json) => {
        const data = json?.data?.[0];
        const number = data?.number;
        const [fontSize, titleY, subtitleY] = getOversizedNumberSize(number?.length);

        const html = `<svg aria-hidden="true" viewBox="0 0 430 430">
            <circle cx="50%" cy="50%" r="50%" fill="${colorPalette[authoredColor]}" />
            <text x="50%" y="${titleY}%" class="number" font-size="${fontSize}px">${number}</text>
            <text x="50%" y="${subtitleY}%" class="subtitle">${data?.subtitle}</text>
        </svg>`;

        chartWrapper.innerHTML = html;
        chartWrapper.role = 'img';
        chartWrapper.ariaLabel = `${number} ${data?.subtitle}`;
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log('Error loading script:', error));
    return;
  }

  const config = getConfig();
  const base = config.miloLibs || config.codeRoot;

  // Must use chained promise. Await will cause loading issues
  Promise.all([fetchData(dataLink), loadScript(`${base}/deps/echarts.common.min.js`)])
    .then(async (values) => {
      const json = values[0];
      const rawData = chartData(json);

      if (!rawData) return;

      const { data, series } = rawData;
      const processedData = processDataset(data);
      const hasOverride = hasPropertyCI(processedData.headers, 'color');
      const colors = hasOverride
        ? getOverrideColors(authoredColor, data)
        : getColors(authoredColor);
      const options = {
        chartWrapper, chartType, data: processedData, series, colors, size, labelDeg,
      };
      const text = propertyValueCI(processedData.headers, 'subheading');

      if (text) {
        const subheading = createTag('p', { class: 'subheading' }, text);
        chartContainer.insertAdjacentElement('beforebegin', subheading);
      }

      if (!(window.IntersectionObserver)) {
        initChart(options);
      } else {
        /* c8 ignore next 12 */
        const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        };

        const observer = new IntersectionObserver(
          handleIntersect(options),
          observerOptions,
        );
        observer.observe(el);
      }

      /* c8 ignore next 4 */
      window.addEventListener('resize', throttle(
        1000,
        () => handleResize(el, authoredSize, chartType, processedData, series, colors),
      ));
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log('Error loading script:', error));
};

export default init;
