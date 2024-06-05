import { Timestamp } from 'firebase/firestore';

export type Note = {
  id: string;
  title: string;
  createdOn: Timestamp;
  content: string;
};

export type RemoteNote = Omit<Note, 'id'>;

export type Todo = {
  id: string;
  title: string;
  createdOn: Timestamp;
  extraContent: string;
  completed: boolean;
  deadline: Timestamp;
};
export type RemoteTodo = Omit<Todo, 'id'>;

export enum CollectionType {
  NOTES = 'notes',
  TODOS = 'todos'
}

