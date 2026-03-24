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
import { notification } from '../notifications/notification';

export function useAuth() {
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged(() => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (!rememberMe) {
        await setPersistence(auth, browserSessionPersistence);
      }
      return await signInWithEmailAndPassword(auth, email, password); // is returning userCredential
    } catch (error) {
      if (error instanceof FirebaseError) {
        notification({ message: error.code, type: 'error', title: 'An error occured' });
        throw new Error(error.code);
      } else if (error instanceof Error) {
        notification({ message: error.message, type: 'error', title: 'An error occured' });
        throw new Error(error.message);
      } else {
        notification({ message: 'An unknown error occurred', type: 'error', title: 'An error occured' });
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
        notification({ message: err.code, type: 'error', title: 'An error occured' });
        throw new Error(err.code);
      } else {
        notification({ message: String(err), type: 'error', title: 'An error occured' });
        throw new Error(String(err));
      }
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email).catch(err => {
      if (err instanceof FirebaseError) {
        notification({ message: err.code, type: 'error', title: 'An error occured' });
        throw new Error(err.code);
      } else {
        notification({ message: String(err), type: 'error', title: 'An error occured' });
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
}
