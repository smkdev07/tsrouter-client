import '@oreillymedia/omui/dist/index.css';
import '@oreillymedia/frontend-foundation/dist/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hydrateRoot } from 'react-dom/client';

import createReduxStore from './store/store';
import { createRoutesArray } from './routes';

const store = createReduxStore(window.initialStoreData);
const { routerBasePath } = window.initialStoreData.environment;
const router = createBrowserRouter(createRoutesArray(store), { basename: routerBasePath });

hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
