import React from 'react';
import GlobalStyle from 'Theme/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Todos from 'components/views/Todos';
import App from 'components/views/App';
import Notes from 'components/views/Notes';
import SignIn from 'components/views/SignIn';

const Root = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/todos" component={Todos} />
          <Route path="/notes" component={Notes} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
