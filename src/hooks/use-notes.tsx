import { useQuery } from '@tanstack/react-query';
import { getNotes } from '@notes/rq';



export function useNotes(){
  return useQuery({
      queryKey: ['notes'],
 queryFn: async () => {
      const notes = await getNotes();
      return Object.keys(notes).map(key => ({ id: key, ...notes[key] })).reverse();
    },
  })
}