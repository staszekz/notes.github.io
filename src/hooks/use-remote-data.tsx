import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { addElementFn, editSingleElementFn, getCollection, deleteSingleElementFn } from '@notes/rq';

export function useRemoteData<T extends {}>({ key }: { key: string }) {
  const collection = useQuery({
    queryKey: [key],
    queryFn: async () => await getCollection({ key }),
    staleTime: 30000,
    placeholderData: keepPreviousData
  });

  const addElement = useMutation({
    mutationFn: async (element: T): Promise<void> => addElementFn({ element, key }),
    onSettled: () => {
      collection.refetch();
    }
  });

  const editElement = useMutation({
    mutationFn: async ({ element, id }: { element: T; id: string }): Promise<void> =>
      editSingleElementFn({ element, key, id }),
    onSettled: () => {
      collection.refetch();
    }
  });

  const deleteElement = useMutation({
    mutationFn: async (id: string): Promise<void> => deleteSingleElementFn({ id, key }),
    onSettled: () => {
      collection.refetch();
    }
  });

  return { collection, addElement, editElement, deleteElement };
}
