import { ActionIcon, Card, Group, Menu, rem, Text } from '@mantine/core';
import classes from './sticker.module.css';
import { Note } from '@notes/types';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { useRemoveNote } from '@notes/hooks';
import { openDeleteModal, openNoteModal } from '../modals';

export function NoteSticker({ data }: { data: Note }) {
  const { removeNote } = useRemoveNote();

  return (
    <Card component="li" withBorder shadow="sm" className={classes.stickerBox}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}> {data.title}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => openNoteModal(data)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={() => openDeleteModal(data.id, removeNote)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Text>{data.content}</Text>
    </Card>
  );
}
