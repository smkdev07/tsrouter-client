const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.resolve('application.json'), 'utf-8'));

const enableApmOn = config.enable_apm_on || ['dev-gke'];
const apmEnabledInContext = enableApmOn.includes(process.env.DEPLOY_CONTEXT);

// Enable DataDog APM tracer if enabled and there is a host to talk to
if (apmEnabledInContext && process.env.DD_AGENT_HOST) {
  const tracer = require('dd-trace').init({
    clientToken: process.env.DATADOG_RUM_CLIENT_TOKEN,
  });
  // Have the tracer ignore the Kubernetes health checks
  tracer.use('express', {
    blocklist: [/\/health\/.*/],
  });
}
