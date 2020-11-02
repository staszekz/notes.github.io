import React from 'react';
import GlobalStyle from 'Theme/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Todos from 'components/views/Todos';
import Home from 'components/views/Home';
import Notes from 'components/views/Notes';
import SignIn from 'components/views/SignIn';
import ContextLayout from 'components/context/contextLayout';

const Root = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ContextLayout>
          <Switch>
            <Route exact path="/" component={SignIn}>
              {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
              <Redirect to="/home" />
            </Route>
            <Route path="/todos" component={Todos} />
            <Route path="/notes" component={Notes} />
            <Route path="/home" component={Home} />
          </Switch>
        </ContextLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
