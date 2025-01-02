import { NoteSticker, Stickers } from '@notes/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getNotesQueryOptions } from '@notes/rq';
import {  NoteWithId } from '@notes/types';

export const NotesStickers = () => {
  const { data } = useSuspenseQuery(getNotesQueryOptions());

return <Stickers<NoteWithId> data={data} Component={NoteSticker} />

}
