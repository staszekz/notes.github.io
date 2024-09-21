import { Table } from '@notes/components';
import { useRemoveNote } from '@notes/hooks';
import { getNotesQueryOptions } from '@notes/rq';
import { NoteWithId } from '@notes/types';
import { useQuery } from '@tanstack/react-query';
import { useReactTable } from '@tanstack/react-table';
import { PaginationState, getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core';
import { useState } from 'react';
import { columns } from './table-config';

type Props = {
  isLoading: boolean;
};

export const NotesTable = ({ isLoading }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data: notes } = useQuery(getNotesQueryOptions());
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

  return <Table<NoteWithId> table={table} isLoading={isLoading} />;
};
