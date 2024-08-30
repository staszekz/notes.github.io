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
  browserLocalPersistence,
  setPersistence,
  sendEmailVerification
} from 'firebase/auth';

import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from '@notes/database';
import { CollectionType } from '@notes/types';
import { FirebaseError } from 'firebase/app';

export const AuthContext = createContext<TContextAuth | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(getAuth().currentUser);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      if (rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.code);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  async function signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(collection(database, CollectionType.USERS), userCredential.user.uid), {});
      await sendEmailVerification(userCredential.user);
      await updateProfile(userCredential.user, {
        displayName
      });
      return userCredential;
    } catch (err) {
      if (err instanceof FirebaseError) {
        throw new Error(err.code);
      } else {
        throw new Error(String(err));
      }
    }
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

  const value: TContextAuth = {
    user,
    signIn,
    signUp,
    signUserOut,
    setRememberMe,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
