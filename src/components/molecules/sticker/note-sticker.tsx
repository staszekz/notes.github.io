import { Box, Text } from '@mantine/core';
import classes from './sticker.module.css';
import { NoteWithId } from '@notes/types';

export function NoteSticker({ data }: { data: NoteWithId }) {
  return (
    <Box component="li" className={classes.stickerBox}>
      <Text size="xl">{data.title}</Text>
      <Text>{data.content}</Text>
    </Box>
  );
}
