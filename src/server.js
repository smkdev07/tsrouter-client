import { getLogger } from '@oreillymedia/fef-actions';
import { createServer } from '@oreillymedia/fef-server';
import createReduxStore from './client/store/store';

const logger = getLogger();

const applicationConfig = require('../application.json');
const { frontend_path: frontendPath } = applicationConfig;

const enableTesting =
  ['testing', 'development'].includes(process.env.ENV) || process.env.IS_TEST_SERVER?.toLowerCase() === 'true';

async function main() {
  const app = await createServer({
    createReduxStore,
    enableMswIntegration: enableTesting,
    setupMswServer: async () => {
      const { server } = await import('../msw/server.js');
      server.listen({ onUnhandledRequest: 'bypass' });
      return server;
    },
    enableTestEndpoints: enableTesting,
    enforceTrailingSlash: true,
    name: applicationConfig.name,
    redirectAnonymousRequestsToLogin: true,
    routerBasePath: frontendPath,
    title: "O'Reilly FE application",
  });

  app.listen(9999, () => {
    logger.info('React frontend server listening on port 9999.');
    if (process.env.NODE_ENV === 'development') {
      logger.info(`Address http://localhost:${applicationConfig.ports.web} for local testing.`);
    }
  });
}
main();
