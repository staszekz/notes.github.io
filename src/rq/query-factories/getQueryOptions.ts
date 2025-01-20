import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCollection, getCollectionCount } from '@notes/rq';
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
      placeholderData: keepPreviousData,
      networkMode: 'offlineFirst'
    }),
  notesCount: () =>
    queryOptions({
      queryKey: [CollectionType.NOTES, 'count'],
      queryFn: async () => {
        return getCollectionCount({ key: CollectionType.NOTES });
      },
      staleTime: 30000
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
      placeholderData: keepPreviousData,
      networkMode: 'offlineFirst'
    }),
  todosCount: () =>
    queryOptions({
      queryKey: [CollectionType.NOTES, 'count'],
      queryFn: async () => {
        const snapshot = await getCollectionCount({ key: CollectionType.TODOS });
        return snapshot.data();
      },
      select: data => data.count,
      staleTime: 30000
    })
};
