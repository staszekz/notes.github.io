import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContext } from 'src/context/context';

const pageTypes:TPageTypes[] = ['todos', 'notes', 'home']

type TPageTypes =
'todos'|'notes'|'home'


export function ContextLayout({ children }) {
  const [pageType, setPageType] = useState<'notes' | 'todos' | 'home'>('notes');
  const { pathname } = useLocation();

  useEffect(() => {
    const [currentPage] = pageTypes.find(page => pathname === page) || ['notes']; ;
    setPageType(currentPage as TPageTypes);
  }, [pathname]);

  return <PageContext.Provider value={pageType}>{children}</PageContext.Provider>;
}



