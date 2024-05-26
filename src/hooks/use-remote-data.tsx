import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { addElementFn, editSingleElementFn, getCollection, deleteSingleElementFn } from '@notes/rq';

// TODO: FIX types
export function useRemoteData<T extends { id: string }, R>({ key }: { key: string }) {
  const collection = useQuery({
    queryKey: [key],
    queryFn: async (): Promise<T[]> => {
      const data: R = await getCollection({ key });
      return Object.keys(data)
        .map((key): T => ({ id: key, ...data[key] }))
        .reverse();
    },
    staleTime: 30000,
    placeholderData: keepPreviousData
  });

  const addElement = useMutation({
    mutationFn: async ({ element }: { element: T }): Promise<void> => addElementFn({ element, key }),
    onSettled: () => {
      collection.refetch();
    }
  });

  const editElement = useMutation({
    mutationFn: async ({ element }: { element: T }): Promise<void> => editSingleElementFn({ element, key }),
    onSettled: () => {
      collection.refetch();
    }
  });

  const deleteElement = useMutation({
    mutationFn: async ({ id }: { id: string }): Promise<void> => deleteSingleElementFn({ id, key }),
    onSettled: () => {
      collection.refetch();
    }
  });

  return { collection, addElement, editElement, deleteElement };
}
