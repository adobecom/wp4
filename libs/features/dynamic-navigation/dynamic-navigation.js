import { getMetadata } from '../../utils/utils.js';

export function foundDisableValues() {
  const dynamicNavDisableValues = getMetadata('dynamic-nav-disable');
  if (!dynamicNavDisableValues) return false;

  const metadataPairsMap = dynamicNavDisableValues.split(',').map((pair) => pair.split(';'));
  const foundValues = metadataPairsMap.filter(([metadataKey, metadataContent]) => {
    const metaTagContent = getMetadata(metadataKey.toLowerCase());
    return (metaTagContent
        && metaTagContent.toLowerCase() === metadataContent.toLowerCase());
  });

  return foundValues.length ? foundValues : false;
}

function dynamicNavGroupMatches(groupMetaData) {
  const storedGroup = window.sessionStorage.getItem('dynamicNavGroup');
  if (groupMetaData && storedGroup) {
    return storedGroup.toLowerCase() === groupMetaData.toLowerCase();
  }
  return false;
}

export default function dynamicNav(url, key) {
  if (foundDisableValues()) return url;
  const metadataContent = getMetadata('dynamic-nav');
  const dynamicNavGroup = getMetadata('dynamic-nav-group');

  if (metadataContent === 'entry') {
    window.sessionStorage.setItem('gnavSource', url);
    window.sessionStorage.setItem('dynamicNavKey', key);
    if (dynamicNavGroup) window.sessionStorage.setItem('dynamicNavGroup', dynamicNavGroup);
    return url;
  }

  if (metadataContent === 'on' && dynamicNavGroup) {
    if (!dynamicNavGroupMatches(dynamicNavGroup)) return url;
  }

  if (metadataContent !== 'on' || key !== window.sessionStorage.getItem('dynamicNavKey')) return url;

  return window.sessionStorage.getItem('gnavSource') || url;
}
