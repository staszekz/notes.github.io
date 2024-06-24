import { PublicHomepage } from '@notes/components';
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { App } from 'src/App';

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <PublicHomepage />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  }
});
