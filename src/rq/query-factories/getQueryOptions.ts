import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCollection } from '@notes/rq';
import { CollectionType, Note, noteSchema, Todo, todoSchema } from '@notes/types';

export const notesQueries = {
  allNotes: () =>
    queryOptions({
      queryKey: [CollectionType.NOTES],
      queryFn: async (): Promise<Note[]> => {
        const data = await getCollection<Note>({ key: CollectionType.NOTES });
        return noteSchema.array().parse(data);
      },
      staleTime: 30000,
      placeholderData: keepPreviousData
    })
};

export const todosQueries = {
  allTodos: () =>
    queryOptions({
      queryKey: [CollectionType.TODOS],
      queryFn: async (): Promise<Todo[]> => {
        const data = await getCollection<Todo>({ key: CollectionType.TODOS });
        return todoSchema.array().parse(data);
      },
      staleTime: 30000,
      placeholderData: keepPreviousData
    })
};
