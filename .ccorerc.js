const path = require('node:path');

const projectCommands = []
  .concat(
    ['cypress.js', 'test-ci.js'].map((cmd) =>
      path.join(process.cwd(), 'node_modules', '@oreillymedia/fef-server', 'src/commands', cmd),
    ),
  )
  .concat(
    ['merge-coverage.cjs'].map((cmd) =>
      path.join(process.cwd(), 'node_modules', '@oreillymedia/chassis-core', 'src/commands', cmd),
    ),
  );

/**
 * This configuration file controls many aspects of how the tooling provided by
 * the fef-server library works. It is expected that projects consuming this
 * library will modify this file.
 */
module.exports = {
  // This value should match whatever `env.` file you use for your production
  // environment.
  defaultMode: 'prod-gke',
  commands: {},
  projectCommands,
};
