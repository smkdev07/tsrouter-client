/**
 * Main build script for building bundles with esbuild.
 */
const esbuild = require('esbuild');
const { rimraf } = require('rimraf');
const { emojify } = require('@oreillymedia/js-schematics/tooling').nodeEmoji;

const { backendConfig, clientConfig, ssrConfig } = require('./esbuild/esbuild.config');

async function build() {
  await Promise.all([
    rimraf('./dist/backend'),
    rimraf('./dist/client'),
    rimraf('./dist/server')
  ]);

  console.log(`${emojify(':building_construction:')}  Building bundles...`);
  const [ clientResult, ssrResult, backendResult ] = await Promise.all([
    esbuild.build(clientConfig),
    esbuild.build(ssrConfig),
    esbuild.build(backendConfig)
  ]);

  const showResults = (build, errors) => console.log(
    `${emojify(errors.length ? 'x': ':white_check_mark:')} ${build} build ${errors.length ? 'failed': 'succeeded'}`
  );
  showResults('Client', clientResult.errors);
  showResults('SSR', ssrResult.errors);
  showResults('Backend', backendResult.errors);
}

build();
