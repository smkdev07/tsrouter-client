const { getBasePath } = require('@oreillymedia/fef-server/lib/test/get-base-path.js');
const { addFefServerTasks } = require('@oreillymedia/fef-server/lib/test/cypress/add-tasks.js');
const { addMswTasks } = require('@oreillymedia/msw-integration/lib/cypress/add-tasks.js');

const { clientConfig } = require('../esbuild/esbuild.config.js');

const basePath = getBasePath(require('../application.json'));

/**
 * This function is called when a project is opened or re-opened (e.g. due to
 * the project's config changing)
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // Add code coverage plugin
  require('@cypress/code-coverage/task')(on, config);

  // This will cover any code that is "unit-tested" in Cypress (e.g. the Cypress
  // test loads code directly and executes it).
  const { banner: _banner, external: _external, format: _format, ...cypressBuildConfig } = clientConfig;
  const preprocessor = require('@oreillymedia/chassis-core/lib/esbuild/cypressFilePreprocessor.cjs')(
    cypressBuildConfig,
  );
  on('file:preprocessor', preprocessor);

  addFefServerTasks(on, config);
  addMswTasks(on, config, basePath);

  return config;
};

require('@applitools/eyes-cypress')(module);
