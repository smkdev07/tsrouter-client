import React from 'react';

import { RouteErrorView, loaders } from '@oreillymedia/frontend-foundation/router';

import { AppRoot, AppErrorBoundary } from '#client/base/index';

import { MainComponent } from '#client/features/Root/index';

/**
 * @typedef {import('react-router-dom').RouteObject} RouteObject
 * @typedef {import('redux').Store} Store
 */

/**
 * @param {Store} store
 * @returns {RouteObject[]}
 */
export function createRoutesArray(_store) {
  /**
   * @type {RouteObject[]}
   */
  return [
    {
      path: '/',
      element: <AppRoot />,
      errorElement: <AppErrorBoundary />,
      children: [
        {
          index: true,
          element: <MainComponent />,
        },
        // This handles the 404 case.
        {
          path: '*',
          loader: loaders.generateErrorLoader(404),
          errorElement: <RouteErrorView />,
        },
      ],
    },
  ];
}
