import { editSingleElementFn } from '@notes/rq';
import { CollectionType, Note } from '@notes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const key = CollectionType.NOTES

export const useUpdateNote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ element, id }: { element: Note; id: string }): Promise<void> =>
      editSingleElementFn({ element, key, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] })
    }
  });

  return {
    ...mutation,
    updateNote: mutation.mutate,
    isNoteUpdating: mutation.isPending,
    isNoteUpdateError: mutation.isError
  }
};


// return useMutation({
//   mutationFn: () => checkoutBook(book.id),
//   onMutate: async (element????) => {
//     await queryClient.cancelQueries({
//       queryKey: ["books"],
//     });
 
//     const snapshot = {
//       myBooks: queryClient.getQueryData(["books", "my-books"]),
//       bookDetail: queryClient.getQueryData(["books", "detail", book.id]),
//     };

//     queryClient.setQueryData(["books", "my-books"], (previousBooks) =>
//       previousBooks ? [...previousBooks, book] : undefined
//     );

//     queryClient.setQueryData(["books", "detail", book.id], (previousBook) =>
//       previousBook
//         ? {
//           ...previousBook,
//           isCheckedOutByUser: true,
//           availableCopies: previousBook.availableCopies - 1,
//         }
//         : undefined
//     );
//     return () => {
//       queryClient.setQueryData(["books", "my-books"], snapshot.myBooks);
//       queryClient.setQueryData(
//         ["books", "detail", book.id],
//         snapshot.bookDetail
//       );
//     };
//   },

//   onError: (err, _var, rollback) => {
//     rollback?.();
//   },
//   onSettled: () => {
//     return queryClient.invalidateQueries({ queryKey: ["books"] });
//   },
// });