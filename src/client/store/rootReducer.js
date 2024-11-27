import {
  environment,
  ldFeatureFlags,
  jwt,
  navigationAndAnnouncements,
  user,
  userInfo,
  userProfile,
} from '@oreillymedia/fef-actions';

import appReducers from './appReducers';

/* istanbul ignore next -- @preserve */
export default {
  environment,
  ldFeatureFlags,
  jwt,
  navigationAndAnnouncements,
  user,
  userInfo,
  userProfile,
  ...appReducers,
};
