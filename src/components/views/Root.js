import React, { useState } from 'react';
import GlobalStyle from 'Theme/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import todosStore from 'store/todosStore';
import Todos from 'components/views/Todos';
import App from 'components/views/App';
import Notes from 'components/views/Notes';
import SignIn from 'components/views/SignIn';

const Root = () => {
  return (
    <Provider store={todosStore}>
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
