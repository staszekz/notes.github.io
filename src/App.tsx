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
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const queryClient = new QueryClient();

export function App({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MantineProvider>
        <AuthProvider>
          <ModalsProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </ModalsProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

// zrobic panel użytkownika z usuwaniem, zmiana Nazwy,
//  zmiana hasła, zmiana emaila etc
