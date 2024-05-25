import React, { useState, useEffect, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { MainLayout } from '@notes/layout';
import { TodoItem, TodoInput, StyledH1, StyledH2, Filters, Modal, Table } from '@notes/components';

import { fetchTodos, setCompleted, deleteTask, editTask, RootState } from '@notes/redux';
import { usePageTypeContext, useTodos } from '@notes/hooks';
import { useDisclosure } from '@mantine/hooks';
import { MRT_ColumnDef, useMantineReactTable } from 'mantine-react-table';
import { StyledNotesList } from 'src/components/views/Notes/styled';

export const Todos = () => {
  const { data: todos } = useTodos();

  const columns = useMemo<MRT_ColumnDef<any, unknown>[]>(
    () => [
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'deadline', header: 'Deadline' }
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: todos || []
  });

  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <MainLayout>
        <StyledNotesList>
          <StyledH1>My Private Todo tasks</StyledH1>
          <Table table={table} />

          {!todos?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
        </StyledNotesList>
        <Modal opened={opened} close={close} title="Add new todo task" />
      </MainLayout>
    </>
  );
};
