import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store } from './store/index';
import { ContextLayout } from './context';
import { Home, Notes, PublicHomepage, SignUp, Todos } from '@notes/components';
import { app } from './database/database';
import { theme } from './Theme';
import { ThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalsProvider } from '@mantine/modals';

const queryClient = new QueryClient();

const rrfConfig = {
  userProfile: 'users'
};

const rrfProps = {
  firebase: app,
  config: rrfConfig,
  dispatch: store.dispatch
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
            <MantineProvider>
              <ModalsProvider>
                <ThemeProvider theme={theme}>
                  <Routes>
                    <Route path="/" element={<PublicHomepage />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signin" element={<SignUp isSignUp />} />
                    <Route path="/signup" element={<SignUp isSignUp={false} />} />
                  </Routes>
                </ThemeProvider>
              </ModalsProvider>
            </MantineProvider>
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    </QueryClientProvider>
  );
}
