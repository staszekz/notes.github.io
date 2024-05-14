import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store } from './store/index';
import { ContextLayout } from './context';
import { Home, Notes, PublicHomepage, SignUp, Todos } from '@notes/components';
import { app } from './database/database';
import { GlobalStyle, theme } from './Theme';
import { ThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; 
import '@mantine/dates/styles.css'; 
import 'mantine-react-table/styles.css'; 

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase: app,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>

        <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
          <ContextLayout>
          <MantineProvider>
        <ThemeProvider theme={theme}>
        <GlobalStyle />
            <Routes>
              <Route path="/" element={<PublicHomepage />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignUp isSignUp />} />
              <Route path="/signup" element={<SignUp isSignUp={false} />} />
            </Routes>
        </ThemeProvider>
          </MantineProvider>
          </ContextLayout>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
