const { defineConfig } = require('cypress');
const { getCypressTargetPort } = require('@oreillymedia/fef-server/lib/test/get-cypress-target-port.cjs');

const { createDevServer } = require('@oreillymedia/chassis-core/lib/esbuild/esbuildDevServer.js');
const { clientConfig } = require('./esbuild/esbuild.config.js');

const setupComponent = require('./cypress/setup.component.js');
const setupE2E = require('./cypress/setup.e2e');

const applicationJson = require('./application.json');
const coverageRootDir = ['src', 'coverage', process.env.AGENT_NAME, 'cypress'].filter(Boolean).join('/');
const { external: _external, banner: _banner, ...cypressBuildConfig } = clientConfig;

module.exports = defineConfig({
  // projectId: 'cypress-cloud-project-id',
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || `http://localhost:${getCypressTargetPort(applicationJson.ports['cypress-target'])}/`,
    excludeSpecPattern: [
      '**/__snapshots__/*',
      '**/__image_snapshots__/*'
    ],
    reporter: 'junit',
    reporterOptions: {
      mochaFile: `${coverageRootDir}/junit-cypress-e2e-[hash]-output.xml`,
    },
    setupNodeEvents: setupE2E
  },
  component: {
    devServer: createDevServer(cypressBuildConfig),
    experimentalInteractiveRunEvents: true,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: `${coverageRootDir}/component/junit-cypress-component-[hash]-output.xml`
    },
    setupNodeEvents: setupComponent
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  env: {
    codeCoverage: {
      exclude: ['cypress/**/*.*'],
    }
  }
});
