import dotenv from 'dotenv';
import path from 'path';

if (typeof window !== 'undefined') {
  // Mock matchMedia since it's not implemented in JSDOM
  window.matchMedia = jest.fn().mockImplementation(query => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  });
}

// Make sure the environment variables are those found in `env.tests`.
dotenv.config({ path: path.resolve(process.cwd(), 'env.tests') });
// Making sure the `ENV` variable is tests, as that disables some design system
// features that do not function well in tests.
process.env.ENV = 'tests';
