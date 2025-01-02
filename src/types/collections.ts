import { Timestamp } from 'firebase/firestore';

export type Note = {
  title: string;
  createdOn: Timestamp;
  content: string;
};

export type NoteWithId = Note & { id: string };

export type Todo = {
  title: string;
  createdOn: Timestamp;
  content: string;
  completed: boolean;
  deadline: Timestamp | null;
};

export type TodoWithId = Todo & { id: string };

export enum CollectionType {
  NOTES = 'notes',
  TODOS = 'todos',
  USERS = 'users'
}
