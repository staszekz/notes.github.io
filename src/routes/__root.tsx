import { TContextAuth } from '@notes/types';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

type RouterContext = {
  auth: TContextAuth | undefined;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    );
  },
  notFoundComponent: () => {
    return <p>This is the notFoundComponent </p>;
  }
  // pendingComponent: () => {
  //   return <p>Loading...</p>;
  // }
});
