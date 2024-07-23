import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/auth-context';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
import { LoadingOverlay } from '@mantine/core';

import { routeTree } from './routeTree.gen';
import { theme } from './Theme';
import { useAuthContext } from './hooks';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
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
        loaderProps={{ type: 'dots', color: 'var(--primary)', size: 'xl' }}
        overlayProps={{ color: 'var(--dark-bg-color)' }}
        visible
      />
    );
  }
  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={customTheme}>
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
// czy poprzez useQuery i mutacje?
//  zmiana hasła, zmiana emaila etc

// dorobić baner co jest dziś do zrobienia
// dorobić info które zadania się zbliżają dozrobienia
// moze dodąc temp i date
// moze połaczenie  z kalendarzem Google
