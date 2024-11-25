import { ActionIcon, Box, Card, Group, Menu, rem, Text } from '@mantine/core';
import classes from './sticker.module.css';
import { NoteWithId, TodoWithId } from '@notes/types';
import { IconDots, IconEdit, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { useRemoveNote, useRemoveTodo } from '@notes/hooks';
import { openDeleteModal, openNoteModal, openTodoModal } from '../modals';

export function TodoSticker({ data }: { data: TodoWithId }) {
  const { removeTodo } = useRemoveTodo();

  return (
    <Card component="li" withBorder shadow="sm" className={classes.stickerBox} pos={'relative'}>
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
              <Menu.Item leftSection={<IconEdit style={{ width: rem(14), height: rem(14)}}/>  } onClick={()=> openTodoModal(data)} >
               Edit
              </Menu.Item>
              <Menu.Item leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}>
              Mark completed
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                color="red"
                onClick={() => openDeleteModal(data.id, removeTodo)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        </Card.Section>

      <Text>{data.content}</Text>
      <Card.Section withBorder w={'100%'} bottom={'24px'} pos={'absolute'} >
        <Text fw={700} size="xl" >Deadline:{' '}
        {data.deadline?.toDate().toLocaleString()}</Text>
      </Card.Section>
    </Card>
  );
}

