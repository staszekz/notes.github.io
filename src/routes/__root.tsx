import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet, Link, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { getAuth } from 'firebase/auth';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
  notFoundComponent: () => {
    return <p>This is the notFoundComponent </p>;
  }
});
