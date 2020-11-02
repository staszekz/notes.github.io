import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import PageContext from 'components/context/context';

const ContextLayout = ({ children, ...props }) => {
  const [pageType, setPageType] = useState('notes');

  const {
    location: { pathname },
  } = props;

  useEffect(() => {
    const pageTypes = ['todos', 'notes'];

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));

    console.log('currentPage', currentPage);
    setPageType(currentPage);
  }, [pathname]);

  return <PageContext.Provider value={pageType}>{children}</PageContext.Provider>;
};

export default withRouter(ContextLayout);
