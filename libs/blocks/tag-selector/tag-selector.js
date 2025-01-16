import { html, render, useState, useEffect } from '../../deps/htm-preact.js';
import Picker from '../../ui/controls/TagSelectPicker.js';
import { loadCaasTags } from '../caas/utils.js';

const CAAS_LABEL = 'CaaS';
const TAG_KEYS = ['Type', 'Name'];

async function fetchTags(url) {
  const resp = await fetch(url.toLowerCase());

  if (!resp.ok) throw new Error('Network error');

  const { data } = await resp.json();

  if (!Array.isArray(data)) throw new Error('Could not parse data');

  return data.map((item) => {
    const tag = Object.create(null);
    TAG_KEYS.forEach((key) => { tag[key] = item[key]; });

    return tag;
  });
}

const TagPreview = ({ selectedTags = [] }) => {
  const [copyText, setCopyText] = useState('Copy');

  /* c8 ignore next 10 */
  const handleClick = () => {
    navigator.clipboard?.writeText(selectedTags.join(',')).then(
      () => setCopyText('Copied!'),
      () => setCopyText('Copy Failed'),
    );

    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
  };

  return html`
    <section class='tag-preview-container'>
      <button disabled=${!selectedTags.length} onClick=${handleClick}>${copyText}</button>
      <div class='tag-preview'>
        ${selectedTags.map((tag) => html`<p>${tag}</p>`)}
      </div>
    </section>
  `;
};

const TagSelector = ({ consumerUrls = [] }) => {
  const [tagSelectorTags, setTagSelectorTags] = useState({});
  const [options, setOptions] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewTags, setPreviewTags] = useState([]);
  const [optionMap, setOptionMap] = useState();
  const [selected, setSelected] = useState(CAAS_LABEL);
  const caasTagUrl = 'https://www.adobe.com/chimera-api/tags';

  const splitChildren = (tag, path) => {
    const parts = path.split(' | ');
    parts.reduce((curr, value, i) => {
      const label = value.trim();
      const id = `${tag.label}/${parts.slice(0, i + 1).join('/')}`;
      if (!curr[id]) {
        curr[id] = {
          label,
          path: id,
        };
      }
      if (i !== parts.length - 1) {
        curr[id].children = curr[id].children || {};
      }
      return curr[id].children || curr;
    }, tag.children);
  };

  useEffect(() => {
    const getConsumerTags = (data) => {
      const tags = {};

      data.forEach((item) => {
        if (!item.Name || !item.Type) return;
        const id = item.Type.toLowerCase();
        if (!tags[id]) {
          tags[id] = {
            label: item.Type.trim(),
            path: id.trim(),
            children: {},
          };
        }
        splitChildren(tags[id], item.Name);
      });
      return tags;
    };

    const fetchCasS = async () => {
      const { tags, errorMsg } = await loadCaasTags(caasTagUrl);
      if (errorMsg) window.lana.log(`Tag Selector. Error fetching caas tags: ${errorMsg}`, { tags: 'tag-selector', errorType: 'i' });

      setTagSelectorTags((prevConsumerTags) => ({ CaaS: tags, ...prevConsumerTags }));
    };

    const fetchConsumer = () => {
      consumerUrls.forEach(({ title, url }) => {
        fetchTags(url).then((data) => {
          const tags = getConsumerTags(data);
          setTagSelectorTags((prevConsumerTags) => ({ [title]: tags, ...prevConsumerTags }));
        }).catch((e) => {
          /* c8 ignore next 2 */
          window.lana.log(`Tag Selector. Error fetching consumer tags: ${e.message}`, { tags: 'tag-selector', errorType: 'i' });
        });
      });
    };

    fetchCasS();
    fetchConsumer();
  }, [consumerUrls]);

  useEffect(() => {
    const getTagTree = (root) => {
      const caasOptions = Object.entries(root).reduce((opts, [, tag]) => {
        opts[tag.tagID] = {};

        if (Object.keys(tag.tags).length) {
          opts[tag.tagID].children = getTagTree(tag.tags);
        }

        opts[tag.tagID].label = tag.title;
        opts[tag.tagID].path = tag.path.replace('/content/cq:tags/caas/', '');

        return opts;
      }, {});
      return caasOptions;
    };

    const createOptionMap = (root) => {
      const newOptionMap = {};
      const parseNode = (nodes, parent) => {
        Object.entries(nodes).forEach(([key, val]) => {
          newOptionMap[key] = { ...val };
          if (parent) {
            newOptionMap[key].parent = parent;
          }
          if (val.children) {
            parseNode(val.children, newOptionMap[key]);
          }
        });
      };
      parseNode(root);
      return newOptionMap;
    };

    const loadCaaS = () => {
      const opts = getTagTree(tagSelectorTags.CaaS);
      setOptions(opts);
      if (opts && Object.values(opts).some((value) => typeof value !== 'string')) {
        setOptionMap(createOptionMap(opts));
      } else {
        /* c8 ignore next 2 */
        setOptionMap(opts);
      }
    };

    const loadConsumer = () => {
      if (!tagSelectorTags[selected]) return;
      const opts = tagSelectorTags[selected];
      setOptions(opts);
      if (opts && Object.values(opts).some((value) => typeof value !== 'string')) {
        setOptionMap(createOptionMap(opts));
      } else {
        /* c8 ignore next 2 */
        setOptionMap(opts);
      }
    };

    if (selected === CAAS_LABEL && tagSelectorTags.CaaS) {
      loadCaaS();
    } else if (tagSelectorTags[selected]) {
      loadConsumer();
    }
  }, [selected, tagSelectorTags]);

  useEffect(() => {
    setSelectedTags([]);
  }, [selected]);

  const toggleTag = (value) => {
    setSelectedTags((tags) => {
      if (tags.includes(value)) {
        return tags.filter((tag) => tag !== value);
      }
      return [...tags, value];
    });
  };

  useEffect(() => {
    if (selected === CAAS_LABEL) {
      setPreviewTags(selectedTags);
    } else {
      setPreviewTags(selectedTags.map((tag) => optionMap[tag].label));
    }
  }, [selected, selectedTags, optionMap]);

  const setTag = (event) => {
    const tagName = event.target.dataset.tag;
    setSelected(tagName);
  };

  return html`
    <section class="tag-selector-sources">
      <div class="col">
        <div class="tagselect-item ${selected === CAAS_LABEL ? 'expanded' : ''}">
          <button class="has-children" data-tag="${CAAS_LABEL}" onClick=${setTag}>CaaS Tags</button>
        </div>
      </div>
      ${consumerUrls.map(({ title }) => html`
        <div class="col">
          <div class="tagselect-item ${selected === title ? 'expanded' : ''}">
            <button class="has-children" data-tag=${title} onClick=${setTag}>${title}</button>
          </div>
        </div>
      `)}
    </section>
    ${(options && optionMap)
    ? html`<${Picker}
        toggleTag=${toggleTag}
        options=${options}
        optionMap=${optionMap}
        selectedTags=${selectedTags}
      />`
    : html`<div class="tagselect-picker"><div class="spinner"></div></div>`}
    <${TagPreview} selectedTags=${previewTags} />
  `;
};

export default async function init(el) {
  const children = Array.from(el.querySelectorAll(':scope > div'));
  const consumerUrls = [];
  children.forEach((child) => {
    const title = child.children[0].textContent;
    const url = child.children[1].textContent;
    child.style.display = 'none';
    consumerUrls.push({ title, url });
  });

  render(html`<${TagSelector} consumerUrls=${consumerUrls} />`, el);
}
