import { createContext, useEffect, useState } from 'react';
import { auth } from '@notes/database';
import { TContextAuth } from '@notes/types';
import {
  signInWithEmailAndPassword,
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  getAuth,
  inMemoryPersistence,
  setPersistence,
  sendEmailVerification
} from 'firebase/auth';

import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from '@notes/database';
import { CollectionType } from '@notes/types';

export const AuthContext = createContext<TContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);
  function setLoadingState(loading: boolean) {
    setLoading(loading);
  }
  async function signIn(email: string, password: string) {
    if (!rememberMe) {
      try {
        await setPersistence(auth, inMemoryPersistence);
        return signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
    } else {
      return signInWithEmailAndPassword(auth, email, password);
    }
  }

  async function signUp(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // dodac jak mail juz jest uzywany
    await setDoc(doc(collection(database, CollectionType.USERS), userCredential.user.uid), {});
    await sendEmailVerification(userCredential.user);
    await updateProfile(userCredential.user, {
      displayName
    });
    return userCredential;
  }

  // sendPasswordResetEmail(auth, email)
  //   .then(() => {
  //     // Password reset email sent!
  //     // ..
  //   })
  //   .catch(error => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
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

  const value: TContextAuth = { user, signIn, signUp, signUserOut, loading, setLoadingState, setRememberMe };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
