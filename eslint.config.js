/**
 * In ESLint 9, the concept of a "flat" configuration file was introduced. This
 * configuration file is simply a JavaScript object, instead of the custom
 * format used previously.
 */

const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const js = require('@eslint/js');
const pluginCypress = require('eslint-plugin-cypress');
const pluginReact = require('eslint-plugin-react');

const { globals: jestMswGlobals } = require('@oreillymedia/msw-integration/lib/jest/globals.js');
const { globals: cypressMswGlobals } = require('@oreillymedia/msw-integration/lib/cypress/globals.js');

/**
 * The various configuration objects below are merged together based on the file
 * matching. The order of the objects in the array is important, as the objects
 * are merged in order.
 */
module.exports = [
  js.configs.recommended,
  // Global Ignores
  // see: https://eslint.org/docs/next/use/configure/configuration-files#globally-ignoring-files-with-ignores
  {
    ignores: [
      'applitools.config.js',
      'build.js',
      'cypress.config.cjs',
      'jest.config.js',
      'nyc.config.js',
      'dist/*',
      'jest/*',
      'temp/*',
    ],
  },
  // General rules used by all JS/TS file types.
  {
    files: ['**/*.{cjs,js,jsx,mjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
  },
  // CommonJS Files - Node
  {
    files: [
      '*.js',
      '**/*.cjs',
      'esbuild/**/*.{cjs,js}',
      'scripts/**/*.js',
      'src/bootstrap.js',
      'src/datadog-initialize.js',
      'cypress/setup.component.js',
      'cypress/setup.e2e.js',
      'cypress/tasks/**/*.{cjs,js}',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  // ESM Files - JSX
  {
    files: ['src/@(client|common|server)/**/*.{js,jsx}', 'cypress/**/*.{js,jsx}', 'src/server.js'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/jsx-uses-react': ['error'],
      'react/jsx-uses-vars': ['error'],
      'react/prop-types': ['off'],
      'react/react-in-jsx-scope': ['off'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // ESM Files - JSX, Browser
  {
    files: ['src/client/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  // ESM Files - JSX, Common (Browser & Node)
  {
    files: ['src/common/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals['shared-node-browser'],
      },
    },
  },
  // ESM Files - JSX, Node
  {
    files: ['src/server.js', 'src/server/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // ESM Files - JSX, Jest
  {
    files: ['src/@(client|common|server)/**/*.@(spec|test).{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...jestMswGlobals,
      },
    },
  },
  // ESM Files - JSX, Cypress
  {
    files: ['src/@(client|common)/**/*.cy.{js,jsx}', 'cypress/**/*.{js,jsx}'],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        ...pluginCypress.environments.globals.globals,
        ...cypressMswGlobals,
      },
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'cypress/unsafe-to-chain-command': 'warn',
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
