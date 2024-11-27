import '@testing-library/cypress/add-commands';

import { addMswCommands } from '@oreillymedia/msw-integration/lib/cypress/add-commands.js';
import { getBasePath } from '@oreillymedia/fef-server/lib/test/get-base-path.js';

import { worker } from '../../msw/worker.js';
import applicationJson from '../../application.json';

addMswCommands(worker, getBasePath(applicationJson));

// Add custom commands here.
