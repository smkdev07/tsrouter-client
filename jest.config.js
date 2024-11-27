const fs = require('node:fs');
const { getPathAliases } = require('@oreillymedia/chassis-core/lib/build/getPathAliases.cjs');
const { getTransformedLibraries } = require('@oreillymedia/chassis-core/lib/test/jest/getTransformedLibraries.cjs');

const dockerPath = '/orm/service';

module.exports = {
  coverageDirectory: '<rootDir>/src/coverage/jest',
  coveragePathIgnorePatterns: ['jest/', 'node_modules/'],
  coverageReporters: ['json'],
  maxWorkers: process.env.CI?.toLowerCase() === 'true' ? '25%' : '50%',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/jest/testSvgMock.js',
    ...getPathAliases('jest')
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'Jest Tests',
        outputDirectory: './src/coverage',
        outputName: 'junit-jest-tests.xml'
      }
    ]
  ],
  roots: ['<rootDir>/src'],
  rootDir: fs.existsSync(dockerPath) ? dockerPath : process.cwd(),
  setupFiles: [
    '<rootDir>/jest/testSetup.js',
    'jest-canvas-mock'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/msw/jest/setupAfterEnv.js'
  ],
  testEnvironment: '@oreillymedia/chassis-core/lib/jest/js-dom-extended-environment.cjs',
  testEnvironmentOptions: {
    customExportConditions: ['msw'],
    url: 'http://localhost'
  },
  transform: {
    '^.*\\.[tj]sx?$': [
      '@oreillymedia/chassis-core/lib/esbuild/esbuild-transformer.js',
      {}
    ]
  },
  transformIgnorePatterns: [
    ...getTransformedLibraries()
  ]
};
