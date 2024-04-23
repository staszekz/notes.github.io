import React, { useState, useEffect } from 'react';
import PageContext from 'components/context/context';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const pageTypes = ['todos', 'notes', 'home'];

function ContextLayout({ children }) {
  const [pageType, setPageType] = useState('notes');
  const { pathname } = useLocation();
  console.log('🚀 ~ pathname:', pathname);

  useEffect(() => {
    const [currentPage] = pageTypes.filter(page => pathname === page);
    setPageType(currentPage);
  }, [pathname]);

  return <PageContext.Provider value={pageType}>{children}</PageContext.Provider>;
}

ContextLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextLayout;
