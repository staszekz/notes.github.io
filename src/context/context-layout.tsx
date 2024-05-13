import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContext } from 'src/context/context';

const pageTypes = ['todos', 'notes', 'home'];

export function ContextLayout({ children }) {
  const [pageType, setPageType] = useState('notes');
  const { pathname } = useLocation();
  console.log('🚀 ~ pathname:', pathname);

  useEffect(() => {
    const [currentPage] = pageTypes.filter(page => pathname === page);
    setPageType(currentPage);
  }, [pathname]);

  return <PageContext.Provider value={pageType}>{children}</PageContext.Provider>;
}



