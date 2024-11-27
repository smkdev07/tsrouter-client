import { createTheme } from '@mui/material/styles';
import { modernTheme } from '@oreillymedia/omui';

import componentOverrides from './overrides/componentOverrides.js';

const theme = createTheme({
  ...modernTheme,
  breakpoints: {
    values: {
      ...modernTheme.breakpoints.values,
    },
  },
  palette: {
    ...modernTheme.palette,
  },
  typography: {
    ...modernTheme.typography
  },
  components: { ...modernTheme.components, ...componentOverrides },
});

export default theme;
