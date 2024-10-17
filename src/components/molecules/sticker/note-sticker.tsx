import { Box, Text } from '@mantine/core';
import { getNotesQueryOptions } from '@notes/rq';
import { useSuspenseQuery } from '@tanstack/react-query';
import classes from './sticker.module.css';

export function NoteSticker() {
  const { data: notes } = useSuspenseQuery(getNotesQueryOptions());

  return notes.map(note => {
    return (
      <Box className={classes.stickerBox}>
        <Text>Paper is the most basic ui component</Text>
        <Text>Use it to create cards, dropdowns, modals and other components that require background with shadow</Text>
      </Box>
    );
  });
}
