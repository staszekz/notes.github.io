import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store } from './store/index';
import { ContextLayout } from './context';
import { Home, Notes, PublicHomepage, SignUp, Todos } from '@notes/components';
import { app } from './database/database';
import { GlobalStyle, theme } from './Theme';
import { ThemeProvider } from 'styled-components';

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
          </ContextLayout>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
