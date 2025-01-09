import { NoteSticker, Stickers } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { notesQueries } from '@notes/rq';
import { Note } from '@notes/types';

export const NotesStickers = () => {
  const { data } = useSuspenseQuery(notesQueries.allNotes());

  return <Stickers<Note> data={data} Component={NoteSticker} />;
};
