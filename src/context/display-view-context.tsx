import { createContext, useState } from 'react';
import { TContextDisplayView, ViewType, viewTypes } from '@notes/types';

export const DisplayViewContext = createContext<TContextDisplayView | undefined>(undefined);

export function DisplayViewProvider({ children }) {
  const [view, setView] = useState<ViewType>(viewTypes.TABLE);
  // TODO: Add logic to persist view in firebase
  return <DisplayViewContext.Provider value={{ view, setView }}>{children}</DisplayViewContext.Provider>;
}
