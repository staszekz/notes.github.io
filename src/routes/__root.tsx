// import { Index } from '@notes/components';
import { NavBar } from '@notes/components';
import { MainLayout } from '@notes/layout';
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { App } from 'src/App';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <App> */}
      {/* <NavBar /> */}
      <Outlet />
      {/* </App> */}
      {/* <hr /> */}
      {/* <Index /> */}
      {/* <MainLayout> */}
      {/* </MainLayout> */}
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return <p>This is the notFoundComponent configured on root route</p>;
  }
});
