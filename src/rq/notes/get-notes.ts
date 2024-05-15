import { DATABASE_URL } from 'src/database/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const getNotes = async () => {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/notes.json`)
  return await res.json()
}