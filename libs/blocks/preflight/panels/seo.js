import { html, signal, useEffect } from '../../../deps/htm-preact.js';
import getServiceConfig from '../../../utils/service-config.js';

const DEF_ICON = 'purple';
const DEF_DESC = 'Checking...';
const pass = 'green';
const fail = 'red';
const limbo = 'orange';

const KNOWN_BAD_URLS = ['news.adobe.com'];
const SPIDY_URL_FALLBACK = 'https://spidy.corp.adobe.com';

const h1Result = signal({ icon: DEF_ICON, title: 'H1 count', description: DEF_DESC });
const titleResult = signal({ icon: DEF_ICON, title: 'Title size', description: DEF_DESC });
const canonResult = signal({ icon: DEF_ICON, title: 'Canonical', description: DEF_DESC });
const descResult = signal({ icon: DEF_ICON, title: 'Meta description', description: DEF_DESC });
const bodyResult = signal({ icon: DEF_ICON, title: 'Body size', description: DEF_DESC });
const loremResult = signal({ icon: DEF_ICON, title: 'Lorem Ipsum', description: DEF_DESC });
const linksResult = signal({ icon: DEF_ICON, title: 'Links', description: DEF_DESC });
const badLinks = signal([]);

function checkH1s() {
  const h1s = document.querySelectorAll('h1');
  const result = { ...h1Result.value };
  if (h1s.length === 1) {
    result.icon = pass;
    result.description = 'Only one H1 on the page.';
  } else {
    result.icon = fail;
    if (h1s.length > 1) {
      result.description = 'Reason: More than one H1 on the page.';
    } else {
      result.description = 'Reason: No H1 on the page.';
    }
  }
  h1Result.value = result;
  return result.icon;
}

async function checkTitle() {
  const titleSize = document.title.replace(/\s/g, '').length;
  const result = { ...titleResult.value };
  if (titleSize < 15) {
    result.icon = fail;
    result.description = 'Reason: Title size is too short.';
  } else if (titleSize > 70) {
    result.icon = fail;
    result.description = 'Reason: Title size is too long.';
  } else {
    result.icon = pass;
    result.description = 'Title size is good.';
  }
  titleResult.value = result;
  return result.icon;
}

async function checkCanon() {
  const result = { ...canonResult.value };
  const canon = document.querySelector("link[rel='canonical']");
  if (!canon) {
    result.icon = pass;
    result.description = 'Canonical is self-referencing.';
  } else {
    const { href } = canon;
    try {
      const resp = await fetch(href, { method: 'HEAD' });
      if (!resp.ok) {
        result.icon = fail;
        result.description = 'Reason: Error with canonical reference.';
      }
      if (resp.ok) {
        if (resp.status >= 300 && resp.status <= 308) {
          result.icon = fail;
          result.description = 'Reason: Canonical reference redirects.';
        } else {
          result.icon = pass;
          result.description = 'Canonical referenced is valid.';
        }
      }
    } catch (e) {
      result.icon = limbo;
      result.description = 'Canonical cannot be crawled.';
    }
  }
  canonResult.value = result;
  return result.icon;
}

async function checkDescription() {
  const metaDesc = document.querySelector('meta[name="description"]');
  const result = { ...descResult.value };
  if (!metaDesc) {
    result.icon = fail;
    result.description = 'Reason: No meta description found.';
  } else {
    const descSize = metaDesc.content.replace(/\s/g, '').length;
    if (descSize < 50) {
      result.icon = fail;
      result.description = 'Reason: Meta description too short.';
    } else if (descSize > 150) {
      result.icon = fail;
      result.description = 'Reason: Meta description too long.';
    } else {
      result.icon = pass;
      result.description = 'Meta description is good.';
    }
  }
  descResult.value = result;
  return result.icon;
}

async function checkBody() {
  const result = { ...bodyResult.value };
  const { length } = document.documentElement.innerText;

  if (length > 100) {
    result.icon = pass;
    result.description = 'Body content has a good length.';
  } else {
    result.icon = fail;
    result.description = 'Reson: Not enough content.';
  }
  bodyResult.value = result;
  return result.icon;
}

async function checkLorem() {
  const result = { ...loremResult.value };
  const { innerHTML } = document.documentElement;
  const htmlWithoutPreflight = innerHTML.replace(document.getElementById('preflight')?.outerHTML, '');
  if (htmlWithoutPreflight.includes('Lorem ipsum')) {
    result.icon = fail;
    result.description = 'Reason: Lorem ipsum is used on the page.';
  } else {
    result.icon = pass;
    result.description = 'No Lorem ipsum is used on the page.';
  }
  loremResult.value = result;
  return result.icon;
}

function makeGroups(arr, n = 20) {
  const batchSize = Math.ceil(arr.length / n);
  const size = Math.ceil(arr.length / batchSize);
  return Array.from({ length: batchSize }, (v, i) => arr.slice(i * size, i * size + size));
}

const connectionError = () => {
  linksResult.value = {
    icon: fail,
    title: 'Links',
    description: `A VPN connection is required to use the link check service.
    Please turn on VPN and refresh the page. If VPN is running contact your site engineers for help.`,
  };
};

async function spidyCheck(url) {
  try {
    const resp = await fetch(url, { method: 'HEAD' });
    if (resp.ok) return true;
    connectionError();
  } catch (e) {
    connectionError();
    window.lana.log(`There was a problem connecting to the link check API ${url}. ${e}`, { tags: 'preflight', errorType: 'i' });
  }
  return false;
}

async function getSpidyResults(url, opts) {
  try {
    const resp = await fetch(`${url}/api/url-http-status`, opts);
    if (!resp.ok) return [];

    const json = await resp.json();
    if (!json.data || json.data.length === 0) return [];

    return json.data.reduce((acc, result) => {
      const status = result.status === 'ECONNREFUSED' ? 503 : result.status;
      if (status >= 399) {
        result.status = status;
        acc.push(result);
      }
      return acc;
    }, []);
  } catch (e) {
    window.lana.log(`There was a problem connecting to the link check API ${url}/api/url-http-status. ${e}`, { tags: 'preflight', errorType: 'i' });
    return [];
  }
}

function compareResults(result, link) {
  const match = link.liveHref === result.url;
  if (!match) return false;
  if (link.closest('header')) link.parent = 'gnav';
  if (link.closest('main')) link.parent = 'main';
  if (link.closest('footer')) link.parent = 'footer';
  link.classList.add('problem-link');
  link.status = result.status;
  link.dataset.status = link.status;
  return true;
}

async function checkLinks() {
  const { spidy, preflight } = await getServiceConfig(window.location.origin);
  // Do not re-check if the page has already been checked
  if (linksResult.value.checked) return;

  // Check to see if Spidy is available.
  const spidyUrl = spidy?.url || SPIDY_URL_FALLBACK;
  const canSpidy = await spidyCheck(spidyUrl);
  if (!canSpidy) return;

  /**
   * Find all links with an href.
   * Filter out any local or existing preflight links.
   * Set link to use hlx.live so the service can see them without auth
   * */
  const knownBadUrls = preflight?.ignoreDomains
    ? preflight?.ignoreDomains.split(',').map((url) => url.trim())
    : KNOWN_BAD_URLS;

  const links = [...document.querySelectorAll('a')]
    .filter((link) => {
      if (
        link.href // Has an href tag
        && !link.href.includes('local') // Is not a local link
        && !link.closest('.preflight') // Is not inside preflight
        && !knownBadUrls.some((url) => url === link.hostname) // Is not a known bad url
      ) {
        link.liveHref = link.href.replace('hlx.page', 'hlx.live');
        link.liveHref = link.href.replace('aem.page', 'aem.live');
        return true;
      }
      return false;
    });

  const groups = makeGroups(links);
  const baseOpts = { method: 'POST', headers: { 'Content-Type': 'application/json' } };
  const badResults = [];

  for (const group of groups) {
    const urls = group.map((link) => link.liveHref);
    const opts = { ...baseOpts, body: JSON.stringify({ urls }) };
    const spidyResults = await getSpidyResults(spidyUrl, opts);
    badResults.push(...spidyResults);
  }

  badLinks.value = badResults.map((result) => links.find((link) => compareResults(result, link)));

  // Format the results for display
  const count = badLinks.value.length;
  const linkText = count > 1 || count === 0 ? 'links' : 'link';
  const badDesc = `Reason: ${count} problem ${linkText}. Use the list below to fix them.`;
  const goodDesc = 'Links are valid.';

  // Build the result display object
  linksResult.value = {
    title: linksResult.value.title,
    checked: true,
    icon: count > 0 ? fail : pass,
    description: count > 0 ? badDesc : goodDesc,
  };
}

export async function sendResults() {
  const robots = document.querySelector('meta[name="robots"]').content || 'all';

  const data = {
    dateTime: new Date().toLocaleString(),
    url: window.location.href,
    H1: h1Result.value.description,
    httpsLinks: linksResult.value.description,
    title: titleResult.value.description,
    canon: canonResult.value.description,
    metaDescription: descResult.value.description,
    loremIpsum: loremResult.value.description,
    bodyLength: bodyResult.value.description,
    https: window.location.protocol === 'https:' ? 'HTTPS' : 'HTTP',
    robots,
  };

  await fetch(
    'https://main--milo--adobecom.aem.page/seo/preflight',
    {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ data }),
    },
  );
}

function SeoItem({ icon, title, description }) {
  return html`
    <div class=preflight-item>
      <div class="result-icon ${icon}"></div>
      <div class=preflight-item-text>
        <p class=preflight-item-title>${title}</p>
        <p class=preflight-item-description>${description}</p>
      </div>
    </div>`;
}

async function getResults() {
  const h1 = checkH1s();
  const title = checkTitle();
  const canon = await checkCanon();
  const desc = checkDescription();
  const body = checkBody();
  const lorem = checkLorem();
  const links = await checkLinks();

  const icons = [h1, title, canon, desc, body, lorem, links];

  const red = icons.find((icon) => icon === 'red');
  if (!red) return;

  const aemSk = document.querySelector('aem-sidekick');
  const hlxSk = document.querySelector('helix-sidekick');
  if (!aemSk && !hlxSk) return;

  const publishBtn = aemSk
    ? aemSk.shadowRoot.querySelector('plugin-action-bar').shadowRoot.querySelector('sk-action-button.publish')
    : hlxSk.shadowRoot.querySelector('div.publish.plugin button');

  publishBtn.addEventListener('click', () => {
    sendResults();
  });
}

export default function Panel() {
  useEffect(() => { getResults(); }, []);
  return html`
    <div class=preflight-columns>
      <div class=preflight-column>
        <${SeoItem} icon=${titleResult.value.icon} title=${titleResult.value.title} description=${titleResult.value.description} />
        <${SeoItem} icon=${h1Result.value.icon} title=${h1Result.value.title} description=${h1Result.value.description} />
        <${SeoItem} icon=${canonResult.value.icon} title=${canonResult.value.title} description=${canonResult.value.description} />
        <${SeoItem} icon=${linksResult.value.icon} title=${linksResult.value.title} description=${linksResult.value.description} />
      </div>
      <div class=preflight-column>
        <${SeoItem} icon=${bodyResult.value.icon} title=${bodyResult.value.title} description=${bodyResult.value.description} />
        <${SeoItem} icon=${loremResult.value.icon} title=${loremResult.value.title} description=${loremResult.value.description} />
        <${SeoItem} icon=${descResult.value.icon} title=${descResult.value.title} description=${descResult.value.description} />
      </div>
    </div>
    <div class='problem-links'>
    ${badLinks.value.length > 0 && html`
      <p class="note">Close preflight to see problem links highlighted on page.</p>
      <table>
        <tr>
          <th></th>
          <th>Problematic URLs</th>
          <th>Located in</th>
          <th>Status</th>
        </tr>
        ${badLinks.value.map((link, idx) => html`
          <tr>
            <td>${idx + 1}.</td>
            <td><a href='${link.liveHref}' target='_blank'>${link.liveHref}</a></td>
            <td><span>${link.parent}</span></td>
            <td><span>${link.status}</span></td>
          </tr>`)}
      </table>`}
    </div>`;
}
