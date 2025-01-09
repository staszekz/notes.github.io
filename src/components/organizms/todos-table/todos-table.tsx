import { Table } from '@notes/components';
import { useRemoveTodo, useUpdateTodo } from '@notes/hooks';
import { todosQueries } from '@notes/rq';
import { Todo } from '@notes/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useReactTable } from '@tanstack/react-table';
import { PaginationState, getCoreRowModel, getPaginationRowModel } from '@tanstack/table-core';
import { useState } from 'react';
import { columns } from './table-config';

// TODO: użyć search z <Link search={search} /> do paginacji w tabelach oraz reszcie wydoków
export const TodosTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data: todos } = useSuspenseQuery(todosQueries.allTodos());
  const { removeTodo } = useRemoveTodo();
  const { updateTodo } = useUpdateTodo();

  // TODO: get Table type
  const table = useReactTable({
    columns: columns({ removeTodo, updateTodo }),
    data: todos || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel()
  });

  return <Table<Todo> table={table} />;
};
