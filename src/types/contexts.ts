import { User, UserCredential } from 'firebase/auth';
import React from 'react';

export type TContextAuth = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  resetPassword: (email: string) => void;
};
