import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getCollection } from '@notes/rq';
import { CollectionType, Note, Todo } from '@notes/types';

export function getNotesQueryOptions() {
  return queryOptions({
    queryKey: [CollectionType.NOTES],
    queryFn: async (): Promise<(Note & { id: string })[]> => await getCollection<Note>({ key: CollectionType.NOTES }),
    staleTime: 30000,
    placeholderData: keepPreviousData
  })
}


export function getTodosQueryOptions() {
  return queryOptions({
    queryKey: [CollectionType.TODOS],
    queryFn: async (): Promise<(Todo & { id: string })[]> => await getCollection<Todo>({ key: CollectionType.TODOS }),
    staleTime: 30000,
    placeholderData: keepPreviousData
  })
}