import { createReduxStore as createStore } from '@oreillymedia/fef-actions';

import rootReducer from './rootReducer';

/* istanbul ignore next -- @preserve */
export function createReduxStore(initialState, middlewares) {
  const store = createStore(rootReducer, initialState, middlewares);

  return store;
}

export default createReduxStore;
