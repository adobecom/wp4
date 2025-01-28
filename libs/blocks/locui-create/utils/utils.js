import getServiceConfig from '../../../utils/service-config.js';
import { origin } from '../../locui/utils/franklin.js';
import { getInitialName } from '../input-urls/index.js';
import {
  env,
  locSelected,
  locales as stLocales,
  project as stProject,
} from '../store.js';

export function getTenantName() {
  try {
    const url = window.location.href;
    const regex = /--([^--]+)--/;
    const match = url.match(regex);
    if (match?.[1]) {
      // console.log('Tenant name extracted:', match[1]);
      return match[1];
    }
    // console.warn('No tenant name found in URL. Defaulting to "milo".');
    return 'milo';
  } catch (error) {
    // console.error('Error extracting tenant name:', error);
    return 'milo';
  }
}

export function processLocaleData(localeData) {
  const processedLocales = localeData.locales.data
    .map((locItem) => ({
      ...locItem,
      livecopies: locItem.livecopies
        .split(',')
        .map((loc) => loc.trim())
        .join(','),
    }))
    .sort((a, b) => a.language.localeCompare(b.language));

  const processedLocaleRegion = localeData.localegroups.data.map((item) => ({
    ...item,
    value: item.value
      .split(',')
      .map((val) => val.trim())
      .join(','),
  }));

  return { locales: processedLocales, localeRegion: processedLocaleRegion };
}

export const createPayload = (project) => {
  let urls = [...project.value.urls];
  if (project.value.fragments.length > 0) {
    urls = [
      ...urls,
      ...project.value.fragments.map((frag) => `${origin}${frag}`),
    ];
  }

  return {
    tenantBaseUrl: origin,
    projectName: project.value.name,
    projectType: project.value.type,
    referrer: 'studio',
    languages: project.value.languages,
    urls,
    settings: {
      env: env.value,
      regionalEditBehaviour: project.value.editBehavior,
      useHtmlFlow: project.value.htmlFlow,
    },
  };
};

export async function getMilocUrl() {
  const { miloc } = await getServiceConfig(origin, env.value);
  return miloc.url;
}

export function getEnvQueryParam() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get('env') ?? 'local';
}

export function setSelectedLocalesAndRegions() {
  const { languages } = stProject.value;
  const localeByLanguage = stLocales.value.reduce((acc, curr) => {
    const { language } = curr;
    acc[language] = curr;
    return acc;
  }, {});
  const selectedLocale = [];
  const activeLocales = {};
  languages.forEach((loc) => {
    const { language, locales } = loc;
    const { livecopies } = localeByLanguage[language] || {};
    const livecopiesArr = [];
    if (livecopies) {
      livecopiesArr.push(...livecopies.split(','));
    }
    if (locales.length > 0) {
      locales.forEach((locale) => {
        activeLocales[locale] = language;
      });
    } else {
      livecopiesArr.forEach((liveCopy) => {
        activeLocales[liveCopy] = language;
      });
    }
    selectedLocale.push(...livecopiesArr);
  });
  selectedLocale.sort((a, b) => a.localeCompare(b));
  locSelected.value = { selectedLocale, activeLocales };
}

export function getLanguageDetails(lang) {
  const langDetails = stLocales.value?.find(
    ({ languagecode }) => languagecode.toLowerCase() === lang.toLowerCase(),
  ) ?? {};
  return [
    {
      action: 'Rollout',
      langCode: langDetails.languagecode,
      language: langDetails.language,
      locales: langDetails.livecopies?.split(','),
      workflow: '',
    },
  ];
}

export function getProjectByParams(searchParams) {
  const encodedUrls = searchParams.get('encodedUrls');
  const type = searchParams.get('type');
  const decodedUrls = encodedUrls?.split(',')?.map((url) => decodeURI(url));
  const language = searchParams.get('language');

  const projectInfo = {};
  if (type) {
    projectInfo.type = type;
    projectInfo.name = getInitialName(type);
  }
  if (decodedUrls?.length > 0) {
    projectInfo.urls = decodedUrls;
  }
  if (language) {
    projectInfo.languages = getLanguageDetails(language);
  }

  return Object.keys(projectInfo).length > 0 ? projectInfo : null;
}
