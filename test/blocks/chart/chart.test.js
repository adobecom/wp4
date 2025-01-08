import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { readFile } from '@web/test-runner-commands';
import { waitForElement } from '../../helpers/waitfor.js';
import { setConfig } from '../../../libs/utils/utils.js';

const {
  SMALL,
  MEDIUM,
  LARGE,
  DESKTOP_BREAKPOINT,
  TABLET_BREAKPOINT,
  colorPalette,
  getResponsiveSize,
  tooltipFormatter,
  getColors,
  getOverrideColors,
  chartData,
  processDataset,
  processMarkData,
  areaSeriesOptions,
  donutTooltipFormatter,
  donutTitleOptions,
  donutSeriesOptions,
  setDonutTitle,
  handleDonutSelect,
  getChartOptions,
  fetchData,
  barTooltipFormatter,
  barSeriesOptions,
  lineSeriesOptions,
  default: init,
  pieTooltipFormatter,
  pieSeriesOptions,
  getOversizedNumberSize,
  getLabelDegree,
} = await import('../../../libs/blocks/chart/chart.js');

const config = { codeRoot: '/libs' };
setConfig(config);

describe('chart', () => {
  let fetch;
  let paramsGetStub;
  before(() => {
    fetch = sinon.stub(window, 'fetch');
    paramsGetStub = sinon.stub(URLSearchParams.prototype, 'get');
    paramsGetStub.withArgs('cache').returns('off');
  });

  after(() => {
    sinon.restore();
  });

  it('getResponsiveSize returns same sizes on desktop', () => {
    window.innerWidth = DESKTOP_BREAKPOINT;
    expect(getResponsiveSize(LARGE)).to.equal(LARGE);
    expect(getResponsiveSize(MEDIUM)).to.equal(MEDIUM);
    expect(getResponsiveSize(SMALL)).to.equal(SMALL);
  });

  it('getResponsiveSize returns correct sizes on tablet', () => {
    window.innerWidth = TABLET_BREAKPOINT;
    expect(getResponsiveSize(LARGE)).to.equal(MEDIUM);
    expect(getResponsiveSize(MEDIUM)).to.equal(MEDIUM);
    expect(getResponsiveSize(SMALL)).to.equal(SMALL);
  });

  it('getResponsiveSize always returns small on phone', () => {
    window.innerWidth = TABLET_BREAKPOINT - 1;
    expect(getResponsiveSize(LARGE)).to.equal(SMALL);
    expect(getResponsiveSize(MEDIUM)).to.equal(SMALL);
    expect(getResponsiveSize(SMALL)).to.equal(SMALL);
  });

  it('tooltipFormatter outputs tooltip in correct format', () => {
    const params = [
      {
        seriesName: 'Chrome with a Really Really Long Name',
        name: 'Sunday',
        value: ['Sunday', '140', '180'],
        encode: {
          x: [0],
          y: [1],
        },
        marker: '<span>x</span>',
      },
      {
        seriesName: 'Firefox Lorem Ipsum Dolor Sit Amet',
        name: 'Sunday',
        value: ['Sunday', '140', '180'],
        encode: {
          x: [0],
          y: [2],
        },
        marker: '<span>x</span>',
      },
    ];
    const tooltip = 'Sunday<br /><span>x</span> 140k Chrome with a Really Really Long Name<br /><span>x</span> 180k Firefox Lorem Ipsum Dolor Sit Amet<i class="tooltip-icon"></i>';

    expect(tooltipFormatter(params, 'k')).to.equal(tooltip);
  });

  it('getColors returns default color list if no color provided', () => {
    const authoredColor = undefined;

    expect(getColors(authoredColor)).to.eql(Object.values(colorPalette));
  });

  it('getColors returns rotated color list if color provided ', () => {
    const authoredColor = 'indigo';
    const colors = ['#4046CA', '#F68511', '#DE3D82', '#7E84FA', '#72E06A', '#147AF3', '#7326D3', '#E8C600', '#CB5D00', '#008F5D', '#BCE931', '#0FB5AE'];

    expect(getColors(authoredColor)).to.eql(colors);
  });

  it('getOverrideColors returns authored color with overrides', () => {
    const fetchedData = {
      data: [
        { Day: 'Mon', Visitors: '150', Group: '', Unit: 'k', Color: '' },
        { Day: 'Tues', Visitors: '230', Group: '', Unit: '', Color: '' },
        { Day: 'Weds', Visitors: '224', Group: '', Unit: '', Color: '' },
        { Day: 'Thurs', Visitors: '218', Group: '', Unit: '', Color: 'magenta' },
        { Day: 'Fri', Visitors: '135', Group: '', Unit: '', Color: 'magenta' },
        { Day: 'Sat', Visitors: '147', Group: '', Unit: '', Color: 'magenta' },
        { Day: 'Sun', Visitors: '260', Group: '', Unit: '', Color: '' },
      ],
    };
    const authoredColor = 'indigo';
    const colors = ['#4046CA', '#4046CA', '#4046CA', '#DE3D82', '#DE3D82', '#DE3D82', '#4046CA'];

    expect(getOverrideColors(authoredColor, fetchedData.data)).to.eql(colors);
  });

  it('chart dataset', () => {
    const fetchedData = {
      data: [
        {
          Day: 'Mon', Chrome: '100', Firefox: '245', Edge: '335', Group: '', Unit: 'k',
        },
        {
          Day: 'Tues', Chrome: '565', Firefox: '345', Edge: '945', Group: '', Unit: '',
        },
        {
          Day: 'Weds', Chrome: '344', Firefox: '234', Edge: '723', Group: '', Unit: '',
        },
        {
          Day: 'Thurs', Chrome: '156', Firefox: '283', Edge: '305', Group: '', Unit: '',
        },
        {
          Day: 'Fri', Chrome: '84', Firefox: '273', Edge: '126', Group: '', Unit: '',
        },
        {
          Day: 'Sat', Chrome: '189', Firefox: '273', Edge: '103', Group: '', Unit: '',
        },
        {
          Day: 'Sun', Chrome: '103', Firefox: '111', Edge: '157', Group: '', Unit: '',
        },
      ],
    };

    const dataset = {
      source: [
        ['Day', 'Chrome', 'Firefox', 'Edge'],
        ['Mon', 100, 245, 335],
        ['Tues', 565, 345, 945],
        ['Weds', 344, 234, 723],
        ['Thurs', 156, 283, 305],
        ['Fri', 84, 273, 126],
        ['Sat', 189, 273, 103],
        ['Sun', 103, 111, 157],
      ],
    };

    expect(processDataset(fetchedData.data, '').dataset).to.eql(dataset);
  });

  it('chart dataset with date', () => {
    const fetchedData = {
      data: [
        {
          Day: '44775', Chrome: '100', Firefox: '245', Edge: '335', Group: '', Unit: 'date-k',
        },
        {
          Day: '44776', Chrome: '565', Firefox: '345', Edge: '945', Group: '', Unit: '',
        },
        {
          Day: '44777', Chrome: '344', Firefox: '234', Edge: '723', Group: '', Unit: '',
        },
        {
          Day: '44778', Chrome: '156', Firefox: '283', Edge: '305', Group: '', Unit: '',
        },
        {
          Day: '44779', Chrome: '84', Firefox: '273', Edge: '126', Group: '', Unit: '',
        },
        {
          Day: '44780', Chrome: '189', Firefox: '273', Edge: '103', Group: '', Unit: '',
        },
        {
          Day: '44781', Chrome: '103', Firefox: '111', Edge: '157', Group: '', Unit: '',
        },
      ],
    };

    const dataset = {
      source: [
        ['Day', 'Chrome', 'Firefox', 'Edge'],
        ['8/2/22', 100, 245, 335],
        ['8/3/22', 565, 345, 945],
        ['8/4/22', 344, 234, 723],
        ['8/5/22', 156, 283, 305],
        ['8/6/22', 84, 273, 126],
        ['8/7/22', 189, 273, 103],
        ['8/8/22', 103, 111, 157],
      ],
    };

    expect(processDataset(fetchedData.data, 'date').dataset).to.eql(dataset);
  });

  it.skip('chart mark series data', () => {
    const fetchedData = {
      series: [
        {
          Type: 'markArea',
          Name: 'Weekend Sale',
          Axis: 'xAxis',
          Value: '8/5/2022-8/6/2022',
        },
        {
          Type: 'markLine',
          Name: 'Promotion',
          Axis: 'xAxis',
          Value: '44775',
        },
        {
          Type: 'markLine',
          Name: 'Campaign Launch',
          Axis: 'xAxis',
          Value: '8/7/2022',
        },
        {
          Type: 'markLine',
          Name: 'Goal',
          Axis: 'yAxis',
          Value: '200',
        },
      ],
    };

    const markAreaData = [
      [{
        name: 'Weekend Sale',
        xAxis: '8/5/22',
      }, { xAxis: '8/6/22' }],
    ];
    const markLineData = [
      {
        name: 'Promotion',
        xAxis: '8/2/22',
      },
      {
        name: 'Campaign Launch',
        xAxis: '8/7/22',
      },
      {
        name: 'Goal',
        yAxis: 200,
      },
    ];
    const markData = processMarkData(fetchedData.series, 'date');

    expect(markData.markArea.data).to.eql(markAreaData);
    expect(markData.markLine.data).to.eql(markLineData);
  });

  it('fetch data sheet', () => {
    const fetchedData = {
      total: 1,
      offset: 0,
      limit: 1,
      data: [
        {
          Browsers: 'Avg Visitors',
          Chrome: '100',
          Firefox: '156',
          Edge: '105',
          Group: '',
          Unit: 'k',
        },
      ],
      ':type': 'sheet',
    };

    const processedData = {
      data: [
        {
          Browsers: 'Avg Visitors',
          Chrome: '100',
          Firefox: '156',
          Edge: '105',
          Group: '',
          Unit: 'k',
        },
      ],
      series: [],
    };
    expect(chartData(fetchedData)).to.eql(processedData);
  });

  it('fetch data multi', () => {
    const fetchedData = {
      extra: {
        total: 4,
        offset: 0,
        limit: 4,
        data: [
          { Type: 'markArea', Name: 'Weekend Sale', Axis: 'xAxis', Value: 'Fri-Sun' },
          { Type: 'markLine', Name: 'Promotion', Axis: 'xAxis', Value: 'Mon' },
          { Type: 'markLine', Name: 'Campaign Launch', Axis: 'xAxis', Value: 'Thurs' },
          { Type: 'markLine', Name: 'Goal', Axis: 'yAxis', Value: '200' },
        ],
      },
      data: {
        total: 7,
        offset: 0,
        limit: 7,
        data: [
          { Day: 'Mon', Visitors: '150', Group: '', Unit: 'k' },
          { Day: 'Tues', Visitors: '230', Group: '', Unit: '' },
          { Day: 'Weds', Visitors: '224', Group: '', Unit: '' },
          { Day: 'Thurs', Visitors: '218', Group: '', Unit: '' },
          { Day: 'Fri', Visitors: '135', Group: '', Unit: '' },
          { Day: 'Sat', Visitors: '147', Group: '', Unit: '' },
          { Day: 'Sun', Visitors: '260', Group: '', Unit: '' },
        ],
      },
      ':version': 3,
      ':names': [
        'extra',
        'data',
      ],
      ':type': 'multi-sheet',
    };

    const processedData = {
      data: [
        { Day: 'Mon', Visitors: '150', Group: '', Unit: 'k' },
        { Day: 'Tues', Visitors: '230', Group: '', Unit: '' },
        { Day: 'Weds', Visitors: '224', Group: '', Unit: '' },
        { Day: 'Thurs', Visitors: '218', Group: '', Unit: '' },
        { Day: 'Fri', Visitors: '135', Group: '', Unit: '' },
        { Day: 'Sat', Visitors: '147', Group: '', Unit: '' },
        { Day: 'Sun', Visitors: '260', Group: '', Unit: '' },
      ],
      series: [
        { Type: 'markArea', Name: 'Weekend Sale', Axis: 'xAxis', Value: 'Fri-Sun' },
        { Type: 'markLine', Name: 'Promotion', Axis: 'xAxis', Value: 'Mon' },
        { Type: 'markLine', Name: 'Campaign Launch', Axis: 'xAxis', Value: 'Thurs' },
        { Type: 'markLine', Name: 'Goal', Axis: 'yAxis', Value: '200' },
      ],
    };

    expect(chartData(fetchedData)).to.eql(processedData);
  });

  it('areaSeriesOptions returns array', () => {
    const firstDataset = [1, 2];
    expect(Array.isArray(areaSeriesOptions(firstDataset))).to.be.true;
    const expected = [
      {
        name: 1,
        areaStyle: { opacity: 1 },
        stack: 'area',
        symbol: 'none',
        type: 'line',
      },
      {
        name: 2,
        areaStyle: { opacity: 1 },
        stack: 'area',
        symbol: 'none',
        type: 'line',
      },
    ];
    expect(areaSeriesOptions(firstDataset)).to.eql(expected);
  });

  it('donutSeriesOptions returns array', () => {
    expect(Array.isArray(donutSeriesOptions(null, null, null, null, { on: () => { } }))).to.be.true;
  });

  it('setDonutTitle sets expects options', () => {
    const chart = { setOption: sinon.spy() };
    const expected = [[{ title: { text: [`{a|${'100'.toLocaleString()}k}`, '{b|title}'].join('\n') } }]];
    setDonutTitle(chart, 100, 'k', 'title');
    expect(chart.setOption.args).to.eql(expected);
  });

  it('handleDonutSelect returns new sum', () => {
    const source = [[100, 'Monday'], [276, 'Tuesday'], [200, 'Wednesday']];
    const selected = { Monday: false, Tuesday: true, Wednesday: true };
    expect(handleDonutSelect(source, selected, { setOption: () => { } }, null, null)).to.equal(476);
  });

  it('donutTitleOptions sums values', () => {
    const source = [[100, 'Monday'], [276, 'Tuesday'], [200, 'Wednesday']];
    const options = donutTitleOptions(source, ['test'], 'M', 'small');
    const expected = {
      show: true,
      left: 'center',
      bottom: '48%',
      text: '{a|576M}\n{b|}',
      textStyle: {
        rich: {
          a: {
            fontSize: 44,
            lineHeight: 55,
            fontWeight: 'bolder',
          },
          b: {
            fontSize: 20,
            lineHeight: 30,
            fontWeight: 'normal',
          },
        },
        color: '#000',
      },
    };
    expect(options).to.eql(expected);
  });

  it('donutTooltipFormatter returns expected string', () => {
    const data = [43, 'Mobile'];
    const encode = { value: [0] };
    const expected = '* Mobile<br />43k 43%<i class="tooltip-icon"></i>';
    expect(donutTooltipFormatter({ marker: '*', data, encode, name: 'Mobile', percent: 43 }, 'k')).to.equal(expected);
  });

  it('getChartOptions', () => {
    expect(typeof getChartOptions({})).to.equal('object');
  });

  it('getChartOptions tooltipFormatter', () => {
    const options = getChartOptions({});
    expect(typeof options.tooltip.formatter([{ seriesName: '', name: '', value: [''], encode: { y: [1] }, marker: '' }])).to.equal('string');
  });

  it('getChartOptions barTooltipFormatter', () => {
    const options = getChartOptions({ chartType: 'bar' });
    expect(typeof options.tooltip.formatter({ seriesName: '', marker: '', value: [''], encode: {}, name: '' })).to.equal('string');
  });

  it('getChartOptions donutTooltipFormatter', () => {
    const options = getChartOptions({ chartType: 'donut' });
    expect(typeof options.tooltip.formatter({ marker: '*', data: [''], encode: { value: [0] }, name: 'Mobile', percent: 0 }, '')).to.equal('string');
  });

  it('getChartOptions pieTooltipFormatter', () => {
    const options = getChartOptions({ chartType: 'pie' });
    expect(typeof options.tooltip.formatter({ marker: '*', data: [''], encode: { value: [0] }, name: 'Chrome' }, '')).to.equal('string');
  });

  it('getChartOptions axisLabel formatter', () => {
    expect(typeof getChartOptions({ chartType: 'bar' })).to.equal('object');
  });

  it('getChartOptions axisLabel formatter', () => {
    const options = getChartOptions({ processedData: { units: ['k', 'm'] } });
    expect(typeof options.yAxis[0].axisLabel.formatter()).to.equal('string');
  });

  it('fetchData functions as expected with cache control enabled', async () => {
    const link = document.createElement('a');
    const linkRel = '/drafts/data-viz/line.json';
    link.href = `${linkRel}`;
    const goodResponse = { ok: true, json: () => true };
    fetch.withArgs(link.href, { cache: 'reload' }).resolves(goodResponse);
    const response = await fetchData(link);
    expect(response).to.be.true;
  });

  it('fetchData returns json given an anchor tag', async () => {
    const link = document.createElement('a');
    const linkRel = '/drafts/data-viz/line.json';
    link.href = `${linkRel}`;
    const goodResponse = { ok: true, json: () => true };
    fetch.withArgs(link.href).resolves(goodResponse);
    const response = await fetchData(link);
    expect(response).to.be.true;
  });

  it('barTooltipFormatter returns expected string', () => {
    const value = ['Avg Visitors', 100, 156, 105];
    const encode = { x: [1] };
    const expected = 'Chrome<br />* 100k Avg Visitors<i class="tooltip-icon"></i>';
    expect(barTooltipFormatter({ seriesName: 'Chrome', marker: '*', value, encode, name: 'Avg Visitors' }, 'k')).to.equal(expected);
  });

  it('barSeriesOptions', () => {
    const firstDataset = [100, 156];
    const colors = ['#EA3829', '#F48411', '#F5D704', '#A9D814', '#26BB36', '#008F5D', '#12B5AE', '#34C5E8', '#3991F3', '#686DF4', '#8A3CE7', '#E054E2', '#DE3C82'];
    const expected = [
      {
        type: 'bar',
        label: {
          show: true,
          formatter: '{@[1]}K',
          position: 'right',
          textBorderColor: '#000',
          distance: 8,
          fontSize: 14,
        },
        colorBy: 'series',
        name: 100,
        showBackground: true,
        backgroundStyle: {
          color: '#EA3829',
          borderRadius: 3,
          opacity: 0.35,
        },
        itemStyle: { borderRadius: 3 },
        barCategoryGap: 0,
        barGap: '33.3%',
        yAxisIndex: 0,
      },
      {
        type: 'bar',
        label: {
          show: true,
          formatter: '{@[2]}K',
          position: 'right',
          textBorderColor: '#000',
          distance: 8,
          fontSize: 14,
        },
        colorBy: 'series',
        name: 156,
        showBackground: true,
        backgroundStyle: {
          color: '#F48411',
          borderRadius: 3,
          opacity: 0.35,
        },
        itemStyle: { borderRadius: 3 },
        barCategoryGap: 0,
        barGap: '33.3%',
        yAxisIndex: 0,
      },
    ];
    expect(barSeriesOptions('bar', false, firstDataset, colors, 'medium', ['K'])).to.eql(expected);
  });

  it('lineSeriesOptions returns correct options with marks', () => {
    const series = [{ Type: 'markArea', Name: 'Weekend', Axis: 'xAxis', Value: 'Saturday-Sunday' }, { Type: 'markLine', Name: 'Standout', Axis: 'xAxis', Value: 'Tuesday' }, { Type: 'markLine', Name: 'Average', Axis: 'yAxis', Value: '200' }];
    const firstDataset = [100, 156, 160];
    const xUnit = '';
    const yUnits = ['K'];
    const expected = [
      {
        type: 'line',
        name: 100,
        symbol: 'none',
        lineStyle: { width: 3 },
        yAxisIndex: 0,
        markArea: {
          data: [
            [
              {
                name: 'Weekend',
                xAxis: 'Saturday',
              },
              { xAxis: 'Sunday' },
            ],
          ],
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              position: 'top',
              distance: 0,
            },
          },
        },
        markLine: {
          data: [
            {
              name: 'Standout',
              xAxis: 'Tuesday',
            },
            {
              name: 'Average',
              yAxis: 200,
            },
          ],
          label: {
            show: false,
            formatter: '{b}',
            position: 'insideStartBottom',
          },
          emphasis: { label: { show: true } },
        },
      },
      {
        type: 'line',
        name: 156,
        symbol: 'none',
        lineStyle: { width: 3 },
        yAxisIndex: 0,
      },
      {
        type: 'line',
        name: 160,
        symbol: 'none',
        lineStyle: { width: 3 },
        yAxisIndex: 0,
      },
    ];

    expect(lineSeriesOptions(series, firstDataset, xUnit, yUnits)).to.eql(expected);
  });

  it('init donut chart', async () => {
    document.body.innerHTML = '<div class="chart"><div>Title</div><div>Subtitle</div><div><div><a href="/drafts/data-viz/chart.json"></a></div></div><div>Footnote</div></div>';
    const el = document.querySelector('.chart');
    const data = await readFile({ path: './mocks/donutChart.json' });
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => JSON.parse(data) });
    el.classList.add('donut');
    init(el);
    const svg = await waitForElement('svg');
    expect(svg).to.exist;

    const sum = 1404;
    const title = Array.from(svg.querySelectorAll('text')).find((text) => text.textContent.includes(sum.toLocaleString()));
    expect(title).to.exist;
  });

  it('init generates list chart', async () => {
    const linkRel = '/drafts/data-viz/list.json';
    document.body.innerHTML = `<div class="chart list"><div>Title</div><div>Subtitle</div><div><div><a href="${linkRel}"></a></div></div><div>Footnote</div></div>`;
    const data = await readFile({ path: './mocks/listChartSingleTable.json' });
    const parsedData = JSON.parse(data);
    const el = document.querySelector('.chart');
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => parsedData });
    init(el);
    const listWrapper = await waitForElement('.list-wrapper');
    expect(listWrapper).to.exist;
  });

  it('init chart with intersection observer', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/chart.html' });
    const el = document.querySelector('.chart');
    const data = await readFile({ path: './mocks/areaChart.json' });
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => JSON.parse(data) });
    el.classList.add('area');
    init(el);
    const svg = await waitForElement('svg');
    expect(svg).to.exist;
  });

  it('init chart with echarts without intersection observer', async () => {
    window.IntersectionObserver = undefined;
    const linkRel = '/drafts/data-viz/column.json';
    document.body.innerHTML = `<div class="chart column"><div>Title</div><div>Subtitle</div><div><div><a href="${linkRel}"></a></div></div><div>Footnote</div></div>`;
    const data = await readFile({ path: './mocks/columnChart.json' });
    const parsedData = JSON.parse(data);
    const el = document.querySelector('.chart');
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => parsedData });
    init(el);
    const svg = await waitForElement('svg');
    expect(svg).to.exist;
  });

  it('pieTooltipFormatter returns expected string', () => {
    const data = [100, 'Chrome'];
    const encode = { value: [0] };
    const expected = 'Chrome<br />* 100k<i class="tooltip-icon"></i>';
    expect(pieTooltipFormatter({ marker: '*', data, encode, name: 'Chrome' }, 'k')).to.equal(expected);
  });

  it('pieSeriesOptions returns correct options', () => {
    const expected = [{
      type: 'pie',
      radius: '90%',
      height: '90%',
      silent: false,
      label: {
        show: false,
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

    expect(pieSeriesOptions(SMALL)).to.eql(expected);
  });

  it('init generates oversized number chart', async () => {
    const linkRel = '/drafts/data-viz/oversized-number.json';
    document.body.innerHTML = `<div class="chart oversized-number"><div>Title</div><div>Subtitle</div><div><div><a href="${linkRel}"></a></div></div><div>Footnote</div></div>`;
    const data = await readFile({ path: './mocks/oversized-number.json' });
    const parsedData = JSON.parse(data);
    const el = document.querySelector('.chart');
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => parsedData });
    init(el);
    const svg = await waitForElement('svg');
    expect(svg).to.exist;
    const chartWrapper = await waitForElement('.chart-wrapper');
    expect(chartWrapper.getAttribute('role')).to.equal('img');
    expect(chartWrapper.getAttribute('aria-label')).to.exist;
  });

  it('getOversizedNumberSize returns maximum size for 1 character', () => {
    expect(getOversizedNumberSize(1)).to.eql([240, 60, 70]);
  });

  it('getOversizedNumberSize returns reduced size for 4 characters', () => {
    expect(getOversizedNumberSize(4)).to.eql([150, 60, 70]);
  });

  it('getOversizedNumberSize returns miniumum size for more than 6 characters', () => {
    expect(getOversizedNumberSize(100)).to.eql([90, 55, 65]);
  });

  it('Horizontal is the default label orientation', () => {
    document.body.innerHTML = '<div class="chart line"></div>';
    const styles = document.querySelector('.chart').classList;
    expect(getLabelDegree(styles, true)).to.equal(0);
  });

  it('Sets degree for diagonal labels', () => {
    document.body.innerHTML = '<div class="chart line mobile-diagonal-labels"></div>';
    const styles = document.querySelector('.chart').classList;
    expect(getLabelDegree(styles, false)).to.be.above(0);
  });

  it('sets default grid bottom', () => {
    const options = getChartOptions({});
    expect(options.grid.bottom).to.equal(90);
  });

  it('sets grid bottom for large chart with default labels', () => {
    const options = getChartOptions({ size: 'large' });
    expect(options.grid.bottom).to.equal(60);
  });

  it('sets grid bottom for large chart with diagonal labels', () => {
    const options = getChartOptions({ size: 'large', labelDeg: 60 });
    expect(options.grid.bottom).to.equal(30);
  });

  it('sets grid bottom for non-large chart with diagonal labels', () => {
    const options = getChartOptions({ size: 'small', labelDeg: 60 });
    expect(options.grid.bottom).to.equal(40);
  });

  it('adds subheading from data file', async () => {
    document.body.innerHTML = '<div class="chart"><div>Title</div><div>Subtitle</div><div><div><a href="/drafts/data-viz/chart.json"></a></div></div><div>Footnote</div></div>';
    const el = document.querySelector('.chart');
    const data = await readFile({ path: './mocks/lineChartSubheading.json' });
    fetch.withArgs(el.getElementsByTagName('a')[0].href).resolves({ ok: true, json: () => JSON.parse(data) });
    el.classList.add('line');
    init(el);
    const subheading = await waitForElement('.subheading');
    expect(subheading).to.exist;
    const chartWrapper = await waitForElement('.chart-wrapper');
    expect(chartWrapper).to.exist;
    expect(chartWrapper.getAttribute('role')).to.equal('img');
    expect(chartWrapper.getAttribute('aria-label')).to.contain('This is a chart');
  });
});
