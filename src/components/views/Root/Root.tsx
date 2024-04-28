import React from 'react';
import GlobalStyle from 'Theme/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from 'store';
import Todos from 'components/views/Todos/Todos';
import Home from 'components/views/Home/Home';
import Notes from 'components/views/Notes/Notes';
import ContextLayout from 'components/context/contextLayout';
import SignUp from 'components/views/Signup/SignUp';
import PublicHomepage from '../PublicHomepage/PublicHomepage';
import { app } from '../../../database/database';

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase: app,
  config: rrfConfig,
  dispatch: store.dispatch,
};

function Root() {
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
export default Root;
