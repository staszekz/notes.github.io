import { QueryClient } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { LoadingOverlay } from '@mantine/core';
import { Spinner } from './components/atoms/spinner/spinner';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';

export function createRouter() {
  const queryClient = new QueryClient();
  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      context: {
        queryClient
      },
      defaultPreload: 'intent',
      defaultPreloadStaleTime: 0,
      defaultPendingComponent: () => {
        <LoadingOverlay
          overlayProps={{ color: 'var(--dark-bg-color)' }}
          loaderProps={{ children: <Spinner /> }}
          visible
        />;
      }

      // defaultPreloadDelay: 10
    }),
    queryClient
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
