import { ActionIcon, Card, Group, Menu, rem, Text } from '@mantine/core';
import classes from './sticker.module.css';
import { TodoWithId } from '@notes/types';
import { IconDots, IconEdit, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { useRemoveTodo, useUpdateTodo } from '@notes/hooks';
import { openDeleteModal, openTodoModal } from '../modals';

export function TodoSticker({ data }: { data: TodoWithId }) {
  const { removeTodo } = useRemoveTodo();
  const { updateTodo } = useUpdateTodo();
  const completed = data.completed ? 'line-through' : undefined;
  return (
    <Card component="li" withBorder shadow="sm" className={classes.stickerBox} pos={'relative'}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text td={completed} fw={500}>
            {' '}
            {data.title}
          </Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => openTodoModal(data)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => {
                  updateTodo({
                    element: { ...data, completed: !data.completed },
                    id: data.id
                  });
                }}
              >
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

      <Text td={completed}>{data.content}</Text>
      <Card.Section withBorder w={'100%'} bottom={'24px'} pos={'absolute'}>
        <Text td={completed} fw={700} size="xl">
          Deadline: {data.deadline?.toDate().toLocaleString()}
        </Text>
      </Card.Section>
    </Card>
  );
}
