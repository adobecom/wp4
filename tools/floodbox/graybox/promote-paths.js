import { crawl } from '../crawl-tree.js';
import RequestHandler from '../request-handler.js';

class PromotePaths {
  constructor(accessToken, org, repo, expName, paths) {
    this.accessToken = accessToken;
    this.org = org;
    this.repo = repo;
    this.expName = expName;
    this.paths = paths;
    this.filesToPromote = [];
    this.requestHandler = new RequestHandler(accessToken);    
  }
  
  async getFilesToPromote() {
    for (let path of this.paths) {
      if (path.endsWith('/')) {
        const resp = await this.requestHandler.daFetch(`https://admin.da.live/list${path}`);
        if (resp.ok) {
          const json = await resp.json();
          for (let child of json) {
            if (child.ext) {
              this.filesToPromote.push(child);
            } else {
              const { results } = crawl({ path: child.path, throttle: 10, accessToken: this.accessToken });
              const crawledFiles = await results;
              this.filesToPromote.push(...crawledFiles);
            }
          }
        }
      } else if (path.endsWith('.json')) {
        this.filesToPromote.push({ path, ext: 'json', name: path.split('/').pop() });
      } else {
        this.filesToPromote.push({ path: `${path}.html`, ext: 'html', name: path.split('/').pop() });
      }
    }
  }
}

async function getFilesToPromote({accessToken, org, repo, expName, paths}) {
  const promoter = new PromotePaths(accessToken, org, repo, expName, paths);
  await promoter.getFilesToPromote();
  return promoter.filesToPromote;
}

export default getFilesToPromote;
