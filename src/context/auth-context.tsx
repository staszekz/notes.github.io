import { createContext } from 'react';
import { useAuth, useUser } from '@notes/hooks';
import { TContextAuth } from '@notes/types';

export const AuthContext = createContext<TContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const auth = useAuth();
  const { user } = useUser();

  return <AuthContext.Provider value={{ ...auth, user }}>{children}</AuthContext.Provider>;
}
