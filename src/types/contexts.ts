import React, { Dispatch } from 'react';
import { User, UserCredential } from 'firebase/auth';
import { ViewType } from './views';

export type TContextAuth = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  resetPassword: (email: string) => void;
};
export type TContextDisplayView = {
  view: ViewType;
  setView: Dispatch<React.SetStateAction<ViewType>>;
};
