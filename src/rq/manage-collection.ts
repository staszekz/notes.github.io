import { DATABASE_URL } from 'src/database/database';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export async function getCollection({ key }: { key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`)
  return await res.json()
}

export async function addElementFn<T>({ element, key }: { element: T, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}.json`, {
    method: 'POST',
    body: JSON.stringify(element),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}
// add option to edit many elements
export async function editSingleElementFn<T extends { id: string }>({ element, key }: { element: T, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}/${element.id}.json`, {
    method: 'PUT',
    body: JSON.stringify(element),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}

// add optipn to delete all / many elements
export async function deleteSingleElementFn({ id, key }: { id: string, key: string }) {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/${key}/${id}.json`, {
    method: 'DELETE',
  })
  return await res.json()
}
