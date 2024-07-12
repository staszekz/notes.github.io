import { LoadingOverlay } from '@mantine/core';
import { auth } from '@notes/database';
import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

type ContextAuth = {
  user: User | undefined;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  loading: boolean;
  setLoadingState: (loading: boolean) => void;
  signUserOut: () => Promise<void>;
};

export const AuthContext = createContext<ContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>();
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
        setUser(undefined);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const value: ContextAuth = { user, signIn, signUp, signUserOut, loading, setLoadingState };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <LoadingOverlay
          visible={loading}
          overlayProps={{ backgroundOpacity: 0 }}
          loaderProps={{ color: 'var(--primary)', type: 'bars' }} // przenieść loading do children, usunąc z contextu
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
