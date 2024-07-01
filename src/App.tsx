// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Home, Notes, PublicHomepage, SignIn, SignUp, Todos } from '@notes/components';
import { theme } from './Theme';
import { ThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/auth-context';
import { Outlet } from '@tanstack/react-router';
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
    <MantineProvider>
      <AuthProvider>
        <ModalsProvider>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ThemeProvider>
        </ModalsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

// zrobic panel użytkownika z usuwaniem, zmiana Nazwy,
//  zmiana hasła, zmiana emaila etc
