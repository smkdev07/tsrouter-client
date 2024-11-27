/// <reference types="cypress" />

import '@oreillymedia/omui/dist/index.css';
import '@oreillymedia/frontend-foundation/dist/index.css';

import '@cypress/code-coverage/support';
import '@testing-library/cypress/add-commands';

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

// Import shared custom commands or override commands
import './commands';
