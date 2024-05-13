import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { store } from '@notes/redux';
import { store } from './store/index';
// import { Todos, Home, Notes, SignUp } from '@notes/components';
import { ContextLayout } from './context';
import { Home, Notes, PublicHomepage, SignUp, Todos } from './components';
import { app } from './database/database';
import { GlobalStyle } from './Theme';

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase: app,
  config: {
  userProfile: 'users',
},
  dispatch: store.dispatch,
};

export function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <GlobalStyle />
        <BrowserRouter basename={import.meta.env.PUBLIC_URL}>
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
