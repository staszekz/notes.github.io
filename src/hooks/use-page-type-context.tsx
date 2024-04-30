import { useContext } from 'react';
import { PageContext } from '@notes/context';

export const usePageTypeContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageTypeContext must be used within a PageContext.Provider');
  }
  return context;
};
