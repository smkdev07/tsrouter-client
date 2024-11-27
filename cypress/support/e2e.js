// Applitools visual diff tooling
import '@applitools/eyes-cypress/commands';

// Coverage support
import '@cypress/code-coverage/support';

// Testing Library commands.
import '@testing-library/cypress/add-commands';

// FEF Server commands
import { addFefServerCommands } from '@oreillymedia/fef-server/lib/test/cypress/add-commands.js';
addFefServerCommands();

// Import shared custom commands or override commands
import './commands';

