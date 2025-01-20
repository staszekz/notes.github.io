import { useState, useEffect } from 'react';
import { auth } from '@notes/database';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  browserSessionPersistence,
  setPersistence
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { database } from '@notes/database';
import { CollectionType } from '@notes/types';
import { FirebaseError } from 'firebase/app';

export const useAuth = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return auth.onAuthStateChanged(() => {
      setLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (!rememberMe) {
        await setPersistence(auth, browserSessionPersistence);
      }
      return await signInWithEmailAndPassword(auth, email, password); // is returning userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.code);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(collection(database, CollectionType.USERS), userCredential.user.uid), {});
      await sendEmailVerification(userCredential.user);
      await updateProfile(userCredential.user, { displayName });
      return userCredential;
    } catch (err) {
      if (err instanceof FirebaseError) {
        throw new Error(err.code);
      } else {
        throw new Error(String(err));
      }
    }
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email).catch(error => {
      console.error(error.code, error.message);
    });
  };

  return {
    signIn,
    signUp,
    setRememberMe,
    loading,
    resetPassword
  };
};
