import { TContextAuth } from '@notes/types';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorComponent, Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start';
import { createTheme, MantineProvider } from '@mantine/core';
import { theme } from '@notes/theme';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from '@notes/context';

const customTheme = createTheme(theme);

type RouterContext = {
  auth: TContextAuth | undefined;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  meta: () => [
    {
      charSet: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      title: 'Notes and Todos'
    }
  ],
  errorComponent: props => {
    return (
      <RootDocument>
        <ErrorComponent {...props} />
      </RootDocument>
    );
  },
  component: RootComponent
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head />
      <Body>
        {/* <QueryClientProvider client={queryClient}> */}
        <MantineProvider theme={customTheme}>
          <Notifications />
          <AuthProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </AuthProvider>
        </MantineProvider>
        {/* </QueryClientProvider> */}
        <ScrollRestoration />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </Body>
    </Html>
  );
}
// export const Route = createRootRouteWithContext<RouterContext>()({
//   component: () => {
//     return (
//       <>
//         <Outlet />
//         {/* <TanStackRouterDevtools /> */}
//         <ReactQueryDevtools initialIsOpen={false} />
//       </>
//     );
//   },
//   notFoundComponent: () => {
//     return <p>This is the notFoundComponent </p>;
//   }
//   // pendingComponent: () => {
//   //   return <p>Loading...</p>;
//   // }
// });
