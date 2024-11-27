import { setupMsw } from '@oreillymedia/msw-integration/lib/jest/setupMsw.js';

import { server } from '../server.js';

setupMsw(server);
