import { signOut } from 'firebase/auth';
import { auth } from '@notes/database';

export const useUser = () => {
  const user = auth.currentUser;
  const signUserOut = () => {
    return signOut(auth);
  };
  return { signUserOut, user };
};
