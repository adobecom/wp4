/* eslint import/no-relative-packages: 0 */
/* eslint-disable no-promise-executor-return, no-async-promise-executor */
import { getConfig } from '../../../utils/utils.js';

let userEventHistory;
const getUserEventHistory = async (id) => {
  if (userEventHistory) return userEventHistory;
  if (!window.adobeIMS?.isSignedInUser()) return Promise.reject(new Error('User not signed in'));
  let resolve;
  let reject;
  userEventHistory = userEventHistory || new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  const profile = await window.adobeIMS.getProfile();
  const apiUrl = getConfig().env.name === 'prod'
    ? 'https://www.adobe.com/gating/api/realtime-profile'
    : 'https://www.stage.adobe.com/gating/api/realtime-profile';
  const res = await fetch(`${apiUrl}?guid=${id || profile.userId}`)
    .then((resp) => (resp.status === 200 ? resp.json() : null));
  if (res) resolve(res);
  reject(new Error('Error retrieving a response'));
  return userEventHistory;
};

export default getUserEventHistory;
