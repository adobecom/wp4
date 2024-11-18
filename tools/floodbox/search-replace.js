/**
 * Search and replace content based on the search type (floodgate or graybox).
 *
 * This is specifically created to be used as part of the PROMOTE operations
 * performed for Floodgate and Graybox content.
 */

class SearchReplace {
  constructor({ searchType, org, repo, expName }) {
    this.searchType = searchType; // 'floodgate' or 'graybox'
    this.org = org;
    this.repo = repo;
    this.expName = expName;
    const repoSuffix = searchType === 'floodgate' ? 'pink' : 'graybox';
    this.destRepo = repo.replace(`-${repoSuffix}`, '');
  }

  searchAndReplace(content) {
    let updatedContent = '';
    if (this.searchType === 'floodgate') {
      updatedContent = this.adjustUrlDomains(content);
    } else if (this.searchType === 'graybox') {
      updatedContent = this.adjustUrlDomains(content);
      const parser = new DOMParser();
      const doc = parser.parseFromString(updatedContent, 'text/html');
      SearchReplace.removeGrayboxStyles(doc); // Remove styles starting with 'gb-'
      SearchReplace.removeGrayboxBlock(doc); // Remove graybox block
      updatedContent = doc.body.outerHTML;
    } else {
      // eslint-disable-next-line no-console
      console.error(`Unknown search type: ${this.searchType}`);
    }
    return updatedContent;
  }

  adjustUrlDomains(content) {
    const searchValue = `--${this.repo}--${this.org}`;
    const replaceValue = `--${this.destRepo}--${this.org}`;
    const updatedContent = content.replaceAll(searchValue, replaceValue);
    if (this.searchType === 'floodgate') {
      return updatedContent;
    }
    return updatedContent.replaceAll(`.page/${this.expName}`, '.page');
  }

  static removeGrayboxStyles(doc) {
    const elements = doc.querySelectorAll('[class*="gb-"]');
    elements.forEach((element) => {
      const classes = element.className.split(' ');
      const filteredClasses = classes.filter(
        (className) => !className.startsWith('gb-'),
      );
      element.className = filteredClasses.join(' ');
    });
  }

  static removeGrayboxBlock(doc) {
    const elements = doc.querySelectorAll('div.graybox');
    elements.forEach((element) => element.remove());
  }
}

function searchAndReplace({ content, searchType, org, repo, expName }) {
  const searchReplace = new SearchReplace({ searchType, org, repo, expName });
  return searchReplace.searchAndReplace(content);
}

export default searchAndReplace;
