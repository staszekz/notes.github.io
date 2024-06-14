import { auth } from '@notes/database';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

type ContextAuth = {
  user: User | undefined;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  loading: boolean;
};

export const AuthContext = createContext<ContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(undefined);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value: ContextAuth = { user, signIn, signUp, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
