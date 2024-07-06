import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/auth-context';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';

import { routeTree } from './routeTree.gen';
import { getAuth } from 'firebase/auth';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: getAuth()
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>
          <ModalsProvider>
            <RouterProvider router={router} />
          </ModalsProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

// zrobic panel użytkownika z usuwaniem, zmiana Nazwy,
//  zmiana hasła, zmiana emaila etc

// dorobić baner co jest dziś do zrobienia
// moze dodąc temp i date
// moze połaczenie  z kalendarzem Google
