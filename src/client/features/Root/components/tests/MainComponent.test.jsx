/// <reference types="@oreillymedia/msw-integration/types/jest" />

import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createTestStore } from '@oreillymedia/fef-actions/testing';

import { MainComponent } from '../MainComponent';
import rootReducer from '#client/store/rootReducer';

afterEach(cleanup);

test('Should render application', () => {
  const store = createTestStore(rootReducer, {
    appState: { welcomeMessage: 'Testing!' },
  });
  const { asFragment } = render(
    <Provider store={store}>
      <MainComponent />
    </Provider>,
  );
  expect(asFragment().querySelector('p')).toContainHTML('Testing!');
});
