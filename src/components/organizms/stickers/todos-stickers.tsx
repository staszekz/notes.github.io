import { Stickers, TodoSticker } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { todosQueries } from '@notes/rq';
import { Todo } from '@notes/types';

export const TodosStickers = () => {
  const { data } = useSuspenseQuery(todosQueries.allTodos());

  return <Stickers<Todo> data={data} Component={TodoSticker} />;
};
