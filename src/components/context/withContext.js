import React from 'react';
import PageContext from 'components/context/context';

const withContext = Component => {
  return function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {context => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    );
  };
};

export default withContext;
