import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './index.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/auth-context';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { theme } from './Theme';
import { useAuthContext } from './hooks';
import { Spinner } from './components/atoms/spinner/spinner';
// import { queryClient, router } from './router';

const customTheme = createTheme(theme);

// function AppWithRouter() {
//   const auth = useAuthContext();
//   if (auth.loading) {
//     return (
//       <LoadingOverlay
//         overlayProps={{ color: 'var(--dark-bg-color)' }}
//         loaderProps={{ children: <Spinner /> }}
//         visible
//       />
//     );
//   }
//   if (!auth.loading) {
//     return <RouterProvider router={router} context={{ auth }} />;
//   }
// }

export function App({ children }) {
  const queryClient = useQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={customTheme}>
        <Notifications />
        <AuthProvider>
          <ModalsProvider>
            {children}
            {/* <AppWithRouter />
             */}
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
