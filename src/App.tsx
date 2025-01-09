import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from '@notes/context';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { routeTree } from './routeTree.gen';
import { theme } from './Theme';
import { useAuthContext } from './hooks';
import { Spinner } from './components/atoms/spinner/spinner';
import { errorNotification } from './hooks/notifications/error-notification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error, query) => {
        // only throw error if query has no data, prevents background data sync errors
        return typeof query.state.data === 'undefined';
      }
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.state.data !== 'undefined') {
        errorNotification({ message: error?.message });
      }
    }
  })
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => (
    <LoadingOverlay overlayProps={{ color: 'var(--dark-bg-color)' }} loaderProps={{ children: <Spinner /> }} visible />
  ),
  defaultPreloadDelay: 10,
  defaultErrorComponent: () => <div>Error occurred</div> // TODO: custom error component fix with Error Boundary
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const customTheme = createTheme(theme);

function AppWithRouter() {
  const auth = useAuthContext();
  if (auth.loading) {
    return (
      <LoadingOverlay
        overlayProps={{ color: 'var(--dark-bg-color)' }}
        loaderProps={{ children: <Spinner /> }}
        visible
      />
    );
  }
  if (!auth.loading) {
    return <RouterProvider router={router} context={{ auth }} />;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={customTheme}>
        <Notifications />
        <AuthProvider>
          <ModalsProvider>
            <AppWithRouter />
          </ModalsProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

// zrobic panel użytkownika z usuwaniem, zmiana Nazwy,
// => czy panel powinien być tylko online z firebase,

// dorobić baner co jest dziś do zrobienia
// dorobić info które zadania się zbliżają dozrobienia
// moze dodąc temp i date
// moze połaczenie  z kalendarzem Google
