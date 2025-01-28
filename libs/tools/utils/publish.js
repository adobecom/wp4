import { getCustomConfig } from '../../../tools/utils/utils.js';

const userCanPublishPage = async (detail, isBulk = true) => {
  if (!detail) return false;
  const { live, profile, webPath } = detail;
  let canPublish = isBulk ? live?.permissions?.includes('write') : true;
  let message = 'Publishing is currently disabled for this page';
  const config = await getCustomConfig('/.milo/publish-permissions-config.json?limit=50000');
  const item = config?.urls?.data?.find(({ url }) => (
    url.endsWith('**') ? webPath.includes(url.slice(0, -2)) : url === webPath
  ));
  if (item) {
    canPublish = false;
    if (item.message) message = item.message;
    const group = config[item.group];
    if (group && profile?.email) {
      let isDeny;
      const user = group.data?.find(({ allow, deny }) => {
        if (deny) {
          /* c8 ignore next 3 */
          isDeny = true;
          return deny === profile.email;
        }
        return allow === profile.email;
      });
      canPublish = isDeny ? !user : !!user;
    }
  }
  return { canPublish, message };
};

export default userCanPublishPage;
