/**
 * Contains the build configurations for our three builds.
 *
 * `backend`: The express server that serves the app and any local BFF routes
 *
 * `clientConfig`: The actual JS application that runs in the user's browser
 *
 * `ssrConfig`: The server-side rendered version of the client JS application.
 *              This app is served by the backend when a user vists the app's url.
 */
const path = require('path');

const browserslist = require('browserslist');
const { esbuildPluginBrowserslist } = require('esbuild-plugin-browserslist');
const { copy } = require('esbuild-plugin-copy');
const stylePlugin = require('esbuild-style-plugin');


const { getPathAliases } = require('@oreillymedia/chassis-core/lib/build/getPathAliases.cjs');
const { getCoveragePlugin } = require('@oreillymedia/fef-server/lib/build/esbuild/coveragePlugin.js');
const { manifestPlugin } = require('@oreillymedia/fef-server/lib/build/esbuild/manifestPlugin.js');
const { getClientExternals } = require('@oreillymedia/fef-server/lib/functions/getClientExternals.js');
const { getExternalReactBanner } = require('@oreillymedia/fef-server/lib/functions/getExternalReactBanner.js');
const { getSsrExternals } = require('@oreillymedia/fef-server/lib/functions/getSsrExternals.js');
const {
  dynamicPathInitializer,
  dynamicPublicPathPlugin,
} = require('@oreillymedia/fef-server/lib/build/esbuild/dynamicPublicPathPlugin.js');

const commonConfig = {
  bundle: true,
  minify: process.env.ENV === 'development' ? false : true,
  loader: {
    '.js': 'jsx',
    '.jpg': 'file',
    '.png': 'file',
    '.svg': 'file',
    '.woff': 'copy',
    '.woff2': 'copy',
  },
  jsx: 'automatic',
  plugins: [],
  alias: getPathAliases('esbuild'),
  legalComments: process.env.BABEL_ENV === 'cypress' ? 'inline' : 'eof',
};

const backendConfig = {
  ...commonConfig,
  entryPoints: ['src/server.js'],
  outfile: './dist/backend/backend-server.js',
  packages: 'external',
  platform: 'node',
  plugins: [...commonConfig.plugins],
};

const clientConfig = {
  ...commonConfig,
  entryPoints: ['src/client/client-render.js'],
  entryNames: '[name].[hash]',
  outdir: './dist/client/',
  define: {
    global: 'window',
    'process.env.ENV': `"${process.env.ENV}"`,
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'module.hot': 'false',
  },
  plugins: [
    ...commonConfig.plugins,
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/assets/*'],
        to: ['./dist/client/'],
      },
    }),
    dynamicPublicPathPlugin(),
    esbuildPluginBrowserslist(browserslist(), { printUnknownTargets: false }),
    stylePlugin({
      postcssConfigFile: path.join(process.cwd(), '.postcssrc.js'),
    }),
    manifestPlugin(),
    ...(process.env.BABEL_ENV === 'cypress' ? [getCoveragePlugin()] : []),
  ],
  mainFields: ['browser', 'module', 'main'],
  sourcemap: process.env.ENV === 'development' ? true : false,
  banner: {
    js: getExternalReactBanner(),
  },
  external: getClientExternals(),
  format: 'esm',
};

const ssrConfig = {
  ...commonConfig,
  entryPoints: ['src/client/server-render.js'],
  outfile: './dist/server/prod-server-bundle.js',
  platform: 'node',
  define: {
    'module.hot': 'false',
  },
  external: [...getSsrExternals()],
  plugins: [
    ...commonConfig.plugins,
    dynamicPublicPathPlugin(),
    stylePlugin({
      postcssConfigFile: path.join(process.cwd(), '.postcssrc.js'),
    }),
  ],
  banner: { js: dynamicPathInitializer },
};

module.exports = {
  backendConfig,
  clientConfig,
  ssrConfig,
};
