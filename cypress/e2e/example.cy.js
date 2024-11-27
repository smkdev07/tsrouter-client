import { getBasePath } from '@oreillymedia/fef-server/lib/test/get-base-path.js';

import appConfig from '../../application.json';

const basePath = getBasePath(appConfig);

describe('Example', () => {
  beforeEach(() => {
    cy.visit(basePath);
  });

  it('should display the page.', () => {
    cy.get('h1').should('contain.text', 'New Frontend Application');
  });
});
