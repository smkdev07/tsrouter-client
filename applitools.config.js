const { GIT_FULL_HASH: batchId } = process.env;
let { CI: isCi, GIT_BRANCH: batchName, JENKINS: isJenkins } = process.env;

isCi = isCi?.toLowerCase() === 'true';
isJenkins = isJenkins?.toLowerCase() === 'true';

let batch;
if (batchId && batchName) {
  batchName += !isCi && !isJenkins ? '--local' : '';
  batch = {
    id: batchId,
    name: batchName,
  };
}

const isDisabled = !process.env.APPLITOOLS_API_KEY || !batchId || !batchName;

module.exports = {
  appName: 'tsrouter-client',
  browser: [
    { width: 375, height: 667, name: 'chrome' },
    { width: 1440, height: 900, name: 'chrome' },
    { width: 1440, height: 900, name: 'firefox' },
    { width: 1440, height: 900, name: 'safari' }
  ],
  failCypressOnDiff: false,
  isDisabled,
  layoutBreakpoints: true,
  serverUrl: 'https://oreillyeyes.applitools.com',
  batch: {
    ...batch,
    properties: [
      { name: 'app', value: 'tsrouter-client' }
    ]
  }
};
