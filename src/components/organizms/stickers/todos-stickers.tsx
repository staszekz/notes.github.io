import {  Stickers, TodoSticker } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getTodosQueryOptions } from '@notes/rq';
import { TodoWithId } from '@notes/types';

export const TodosStickers = () => {
  const { data } = useSuspenseQuery(getTodosQueryOptions());

return <Stickers<TodoWithId> data={data} Component={TodoSticker} />

}
