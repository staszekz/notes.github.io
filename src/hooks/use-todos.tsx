import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@notes/rq';



export function useTodos(){
  return useQuery({
      queryKey: ['todos'],
   queryFn: async () => {
      const todos = await getTodos();
      return Object.keys(todos).map(key => ({ id: key, ...todos[key] })).reverse();
    },
  })
}