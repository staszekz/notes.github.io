import { DATABASE_URL } from 'src/database/database';
import { getAuth } from 'firebase/auth';
import { Note } from '@notes/types';

const auth = getAuth();

export const getNotes = async () => {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/notes.json`)
  return await res.json()
}

export const addNote = async (note: Note) => {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/notes.json`, {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}

export const editSingleNote = async (note: Note) => {

  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/notes/${note.id}.json`, {
    method: 'PUT',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await res.json()
}

export const deleteSingleNote = async (id: string) => {
  const uid = auth.currentUser?.uid;
  const res = await fetch(`${DATABASE_URL}/users/${uid}/notes/${id}.json`, {
    method: 'DELETE',
  })
  return await res.json()
}