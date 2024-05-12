import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store } from '@notes/redux';
import { Todos, Home, Notes, SignUp } from '@notes/components';
import { ContextLayout } from '@notes/context';
import { PublicHomepage } from '@notes/components';
import { app } from './database/database';
import { GlobalStyle } from '@notes/theme';

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase: app,
  config: rrfConfig,
  dispatch: store.dispatch,
};

export function Root() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ContextLayout>
            <Routes>
              <Route path="/" element={<PublicHomepage />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signin" element={<SignUp isSignUp />} />
              <Route path="/signup" element={<SignUp isSignUp={false} />} />
            </Routes>
          </ContextLayout>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
