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
import { errorNotification } from '../notifications/error-notification';

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
        errorNotification({ message: error.code });
        throw new Error(error.code);
      } else if (error instanceof Error) {
        errorNotification({ message: error.message });
        throw new Error(error.message);
      } else {
        errorNotification({ message: 'An unknown error occurred' });
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
        errorNotification({ message: err.code });
        throw new Error(err.code);
      } else {
        errorNotification({ message: String(err) });
        throw new Error(String(err));
      }
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email).catch(err => {
      if (err instanceof FirebaseError) {
        errorNotification({ message: err.code });
        throw new Error(err.code);
      } else {
        errorNotification({ message: String(err) });
        throw new Error(String(err));
      }
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
