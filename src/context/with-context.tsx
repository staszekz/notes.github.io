import React from 'react';
import {PageContext} from '@notes/context';

export const withContext = Component => {
  return function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {context => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    );
  };
};

  