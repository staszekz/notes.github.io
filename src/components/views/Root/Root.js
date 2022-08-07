import React from 'react';
import firebase from 'firebase/app';
import GlobalStyle from 'Theme/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from 'store';
import Todos from 'components/views/Todos/Todos';
import Home from 'components/views/Home/Home';
import Notes from 'components/views/Notes/Notes';
import ContextLayout from 'components/context/contextLayout';
import PublicHomepage from '../PublicHomepage/PublicHomepage';
import SignUp from 'components/views/Signup/SignUp';

const rrfConfig = {
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

console.log('root:', rrfProps, rrfConfig);
const Root = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ContextLayout>
            <Switch>
              <Route exact path="/" component={PublicHomepage}></Route>
              <Route path="/todos" component={Todos} />
              <Route path="/notes" component={Notes} />
              <Route path="/home" component={Home} />
              <Route path="/signin" component={() => <SignUp isSignUp />} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </ContextLayout>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default Root;
