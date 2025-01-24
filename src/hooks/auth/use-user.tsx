import { signOut, updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '@notes/database';

export const useUser = () => {
  const user = auth.currentUser;
  const signUserOut = () => {
    return signOut(auth);
  };
  // TODO: add error handling to updateUser
  const updateUserData = async (data: any) => {
    if (user) {
      console.log(data);
      await updateProfile(user, { displayName: data.name });
      if (data.email) {
        await updateEmail(user, data.email);
      }
    }
  };

  return { signUserOut, user, updateUserData };
};
