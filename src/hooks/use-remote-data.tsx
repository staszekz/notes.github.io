import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { addElementFn, editSingleElementFn, getCollection, deleteSingleElementFn } from '@notes/rq';

export function useRemoteData<T extends { id: string }>({ key }: { key: string }) {
  const collection = useQuery({
    queryKey: [key],
    queryFn: async () => await getCollection({ key }),
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
