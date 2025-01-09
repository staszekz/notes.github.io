import { Timestamp } from 'firebase/firestore';
import z from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdOn: z.instanceof(Timestamp),
  content: z.string()
});

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdOn: z.instanceof(Timestamp),
  content: z.string(),
  completed: z.boolean(),
  deadline: z.instanceof(Timestamp).nullable()
});

export type Note = z.infer<typeof noteSchema>;
export type Todo = z.infer<typeof todoSchema>;

export enum CollectionType {
  NOTES = 'notes',
  TODOS = 'todos',
  USERS = 'users'
}
