import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import { ShellContainer } from '@oreillymedia/frontend-foundation';
import { RouteErrorView } from '@oreillymedia/frontend-foundation/router';

function PageLayout({ children }) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <ShellContainer>{children}</ShellContainer>
    </Suspense>
  );
}

export function AppRoot() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

/* istanbul ignore next -- @preserve */
export function AppErrorBoundary() {
  return (
    <PageLayout>
      <RouteErrorView />
    </PageLayout>
  );
}
