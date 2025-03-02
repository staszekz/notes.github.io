import { signOut, updateProfile } from 'firebase/auth';
import { auth, storage } from '@notes/database';

import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { notification } from '../notifications/notification';
import { useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(auth.currentUser);

  const signUserOut = () => {
    return signOut(auth);
  };

  async function uploadPhoto({ file }: { file: File }) {
    const uid = user?.uid;
    if (!uid) {
      console.error('User not authenticated');
      return;
    }

    const fileExtension = file.name.split('.').pop();
    const storageRef = ref(storage, `avatars/${uid}/${Date.now()}.${fileExtension}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL: downloadURL });
      await user.reload();
      setUser({ ...user });
      notification({ message: 'Photo uploaded successfully', type: 'success', title: 'Success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error uploading file';
      notification({ message: errorMessage, type: 'error', title: 'An error occurred' });
    }
  }

  // TODO: add error handling to updateUser
  const updateUserData = async (data: any) => {
    if (user) {
      await updateProfile(user, { displayName: data.name }).then(() => {
        notification({ message: 'User data updated successfully', type: 'success', title: 'Success' });
      });
      await user.reload();
      setUser({ ...user });
    }
  };

  return { signUserOut, user, updateUserData, uploadPhoto };
};
