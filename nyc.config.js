const coverageRoot = ['src', 'coverage', process.env.AGENT_NAME || '', 'cypress'].filter(Boolean).join('/');

let reportDir;
switch(process.env.ORM_CYPRESS_TEST_MODE) {
  case 'component':
    reportDir = `${coverageRoot}/component`;
    break;
  case 'e2e':
    reportDir = `${coverageRoot}/e2e`;
    break;
  default:
    reportDir = coverageRoot;
    break;
}

module.exports = {
  'exclude-after-remap': false,
  'report-dir': reportDir,
  'reporter': [
    'json'
  ],
  'skip-empty': true,
  'temp-dir': `${coverageRoot}/.nyc_output`
};
