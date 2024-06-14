import { LoadingOverlay } from '@mantine/core';
import { auth, database } from '@notes/database';
import { CollectionType } from '@notes/types';
import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { collection, doc, FirestoreError, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

type ContextAuth = {
  user: User | undefined;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  loading: boolean;
};

export const AuthContext = createContext<ContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  console.log('🚀 ~ loading:', loading);

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email: string, password: string, displayName: string) {
    // setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName
      });
      await setDoc(doc(collection(database, CollectionType.USERS), userCredential.user.uid), {});
      return userCredential;
    } catch (error) {
      alert((error as FirestoreError).message);
      throw new FirebaseError('error', error?.message);
    }
    // setLoading(false);
  }

  // add modal to display errors => maybe a global modal to be reused for every errors

  useEffect(() => {
    setLoading(true);
    console.log('user', user);
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

  const value: ContextAuth = { user, signIn, signUp, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <LoadingOverlay
          visible={loading}
          overlayProps={{ backgroundOpacity: 0 }}
          loaderProps={{ color: 'var(--primary)', type: 'bars' }}
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
// tutaj wrzucic LoadinOverload !!!!
