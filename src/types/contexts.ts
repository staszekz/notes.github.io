import { User, UserCredential } from 'firebase/auth';

export type TContextAuth = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  signUserOut: () => Promise<void>;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean;
};