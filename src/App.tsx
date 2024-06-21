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
          {/* <BrowserRouter basename={import.meta.env.PUBLIC_URL}> */}
          <ModalsProvider>
            <ThemeProvider theme={theme}>
              {/* <Routes> */}
              {/* <Route path="/" element={<PublicHomepage />} /> */}
              {/* <Route path="/todos" element={<Todos />} /> */}
              {/* <Route path="/notes" element={<Notes />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} /> */}
              {/* </Routes> */}
              {children}
            </ThemeProvider>
          </ModalsProvider>
          {/* </BrowserRouter> */}
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

// zrobic panel użytkownika z usuwaniem, zmiana Nazwy,
//  zmiana hasła, zmiana emaila etc
