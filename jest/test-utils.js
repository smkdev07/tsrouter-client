import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import createReduxStore from '../src/client/store/store';

// Get a default full store state
export const STORE_STATE = {
  ...createReduxStore().getState()
};
/*
  Takes your component, defaultProps and store overrides to the complete redux store
  as parameters and returns a `setup` function and a reference to the redux store.
  You should be able to run this once at the top of your tests and use the returned function
  in every test thereafter, just passing in props to override defaults. More documentation at:
  https://github.com/oreillymedia/fef-server/tree/develop/docs/jest-test-utils.md
*/
export function createSetup(Component, defaultProps = {}, storeOverrides = {}) {
  const fullAppState = { ...STORE_STATE, ...storeOverrides };
  const reduxStore = createReduxStore(fullAppState);

  const setup = props => {
    const fullProps = { ...defaultProps, ...props };
    return render(
      <Provider store={reduxStore}>
        <Router>
          <Component {...fullProps} />
        </Router>
      </Provider>
    );
  };

  return {
    setup,
    store: reduxStore
  };
}
