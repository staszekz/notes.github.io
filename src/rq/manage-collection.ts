import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { database, auth } from '@notes/database';
import { CollectionType } from '@notes/types';

export async function getCollection<T>({ key }: { key: CollectionType }): Promise<(T & { id: string })[]> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');
  const res = await getDocs(collection(database, 'users', uid, key));
  return res.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
}

export async function addElementFn<T extends { [x: string]: any }>({
  element,
  key
}: {
  element: T;
  key: CollectionType;
}) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');
  await addDoc(collection(database, 'users', uid, key), element);
}
// add option to edit many elements
export async function editSingleElementFn<T extends {}>({
  element,
  key,
  id
}: {
  element: T;
  key: CollectionType;
  id: string;
}) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');
  const _doc = doc(database, 'users', uid, key, id);
  await updateDoc(_doc, element);
}

// add optipn to delete all / many elements
export async function deleteSingleElementFn({ id, key }: { id: string; key: CollectionType }) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('User not authenticated');
  const _doc = doc(database, 'users', uid, key, id);
  await deleteDoc(_doc);
}
