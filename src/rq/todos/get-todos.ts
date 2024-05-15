import { DATABASE_URL } from 'src/database/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const getTodos = async () => {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/todos.json`)
  return await res.json()
}