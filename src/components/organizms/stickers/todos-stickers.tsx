import { Stickers, TodoSticker } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { todosQueries } from '@notes/rq';
import { TodoWithId } from '@notes/types';

export const TodosStickers = () => {
  const { data } = useSuspenseQuery(todosQueries.allTodos());

  return <Stickers<TodoWithId> data={data} Component={TodoSticker} />;
};
