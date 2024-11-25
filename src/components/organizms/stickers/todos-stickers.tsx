import { NoteSticker, Stickers, TodoSticker } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getNotesQueryOptions, getTodosQueryOptions } from '@notes/rq';
import { NoteWithId, TodoWithId } from '@notes/types';

export const TodosStickers = () => {
  const { data } = useSuspenseQuery(getTodosQueryOptions());

return <Stickers<TodoWithId> data={data} Component={TodoSticker} />

}
