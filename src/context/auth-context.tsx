import { createContext, useEffect, useState } from 'react';
import { auth } from '@notes/database';
import { TContextAuth } from '@notes/types';
import {
  signInWithEmailAndPassword,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth
} from 'firebase/auth';

export const AuthContext = createContext<TContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const [loading, setLoading] = useState(true);

  function setLoadingState(loading: boolean) {
    setLoading(loading);
  }
  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName
    });
    return userCredential;
  }

  function signUserOut() {
    return signOut(auth);
  }
  // add modal to display errors => maybe a global modal to be reused for every errors

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value: TContextAuth = { user, signIn, signUp, signUserOut, loading, setLoadingState };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
