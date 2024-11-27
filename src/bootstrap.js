require('./datadog-initialize.js');

const os = require('node:os');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const { rimraf } = require('rimraf');

const { backendConfig } = require('../esbuild/esbuild.config');

/**
 * This utility will install the ebuild support package for
 * linux-arm64 allowing esbuild to be used from a mounted
 * directory on an M1 mac. It's only installed in dev mode
 * and only if not already installed.
 */
const loadEsbuild = async () => {
  try {
    await exec(`npm ls @esbuild/linux-${os.arch()}`);
  } catch (err) {
    try {
      await exec(`npm install --no-save @esbuild/linux-${os.arch()}`);
    } catch (err2) {
      console.warn(
        `Unable to install linux-${os.arch()} esbuild support package. If you are linking libraries in, bring up the project once without them to fix.`,
      );
    }
  }
  return import('esbuild');
};

const buildDev = async () => {
  const esbuild = await loadEsbuild();
  await rimraf('./dist/backend/*');

  console.log('Building backend...');
  await esbuild.build(backendConfig);
};

if (process.env.NODE_ENV === 'development') {
  buildDev().then(() => {
    console.log('Initial build finished, requiring backend package');
    require('../dist/backend/backend-server');
  });
} else {
  require('../dist/backend/backend-server');
}
