import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getCollection } from '@notes/rq';
import { CollectionType, Note, NoteWithId, Todo, TodoWithId } from '@notes/types';

export const notesQueries = {
  allNotes: () =>
    queryOptions({
      queryKey: [CollectionType.NOTES],
      queryFn: async (): Promise<NoteWithId[]> => await getCollection<Note>({ key: CollectionType.NOTES }),
      staleTime: 30000,
      placeholderData: keepPreviousData
    })
};

export const todosQueries = {
  allTodos: () =>
    queryOptions({
      queryKey: [CollectionType.TODOS],
      queryFn: async (): Promise<TodoWithId[]> => await getCollection<Todo>({ key: CollectionType.TODOS }),
      staleTime: 30000,
      placeholderData: keepPreviousData
    })
};
