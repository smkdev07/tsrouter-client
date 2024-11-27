/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="@oreillymedia/msw-integration/types/cypress" />

import { Provider } from 'react-redux';
import { createReduxStore } from '#client/store/store.js';

import { MainComponent } from '../MainComponent';

const render = (reduxState) => {
  cy.mount(
    <Provider store={createReduxStore(reduxState)}>
      <MainComponent />
    </Provider>,
  );
};

describe('<Home />', () => {
  it('should render correctly', () => {
    const state = {
      appState: {
        welcomeMessage: 'Just a sample test',
      },
    };
    render(state);

    cy.findByText('New Frontend Application').should('exist');
    cy.findByText('Just a sample test').should('exist');
  });

  it('should update the welcome message', () => {
    const state = {
      appState: {
        welcomeMessage: 'Just a sample test',
      },
    };
    render(state);

    cy.findByText('Set Welcome Message').click();
    cy.findByText('Just a sample test').should('exist');

    cy.findByLabelText(/New Welcome Message/).type('My new message');
    cy.findByText('Set Welcome Message').click();
    cy.findByText('My new message').should('exist');
  });
});
