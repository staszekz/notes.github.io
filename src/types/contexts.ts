import { User, UserCredential } from 'firebase/auth';

export type TContextAuth = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  loading: boolean;
  setLoadingState: (loading: boolean) => void;
  signUserOut: () => Promise<void>;
};