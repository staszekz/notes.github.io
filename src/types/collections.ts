export type Note = {
  id: string;
  title: string;
  created: string;
  content: string;
};

export type RemoteNote = Omit<Note, 'id'>;

export type Todo = {
  id: string;
  title: string;
  created: string;
  extraContent: string;
  completed: boolean;
  deadline: string;
};
export type RemoteTodo = Omit<Todo, 'id'>;

export enum CollectionType {
  NOTES = 'notes',
  TODOS = 'todos'
}