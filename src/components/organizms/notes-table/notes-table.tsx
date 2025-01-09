import { Table } from '@notes/components';
import { useRemoveNote } from '@notes/hooks';
import { notesQueries } from '@notes/rq';
import { Note } from '@notes/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useReactTable } from '@tanstack/react-table';
import { PaginationState, getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core';
import { useState } from 'react';
import { columns } from './table-config';

export const NotesTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data: notes } = useSuspenseQuery(notesQueries.allNotes());
  const { removeNote } = useRemoveNote();

  // TODO: get Table type
  const table = useReactTable({
    columns: columns({ removeNote }),
    data: notes || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel()
  });

  return <Table<Note> table={table} />;
};
