import { useContext } from 'react';
import { DisplayViewContext } from '@notes/context';

export const useDisplayViewContext = () => {
  const context = useContext(DisplayViewContext);
  if (context === undefined) {
    throw new Error('useDisplayViewContext must be used within an DisplayViewProvider');
  }
  return context;
};
