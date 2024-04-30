import React, { ComponentType, JSXElementConstructor, ReactNode } from 'react';
import { PageContext } from '@notes/context';

export const withContext = (Component: ComponentType) => {
  return function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {context => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    );
  };
};
