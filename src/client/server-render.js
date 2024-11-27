import '@oreillymedia/omui/dist/index.css';
import '@oreillymedia/frontend-foundation/dist/index.css';

import { Provider } from 'react-redux';
import { StaticRouterProvider } from 'react-router-dom/server';

import { renderApp } from '@oreillymedia/fef-server';
import { createStaticRouteHandler } from '@oreillymedia/fef-server/lib/react-router/index.js';

import { createRoutesArray } from './routes';

export default (options) => {
  const handlerOptions = { basename: options.config.environment.routerBasePath };
  const createRouter = createStaticRouteHandler(createRoutesArray, handlerOptions);

  const createRootComponent = ({ store, router, context }) => {
    return (
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    );
  };

  return renderApp({ ...options, createRouter, createRootComponent });
};
