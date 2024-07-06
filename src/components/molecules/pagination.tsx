import { Pagination as ManitinePagination } from '@mantine/core';
import { Table } from '@tanstack/table-core';

export function Pagination<T>({ table }: { table: Table<T> }) {
  return (
    <ManitinePagination
      p={4}
      color={'var(--secondary)'}
      bg={'var(--primary)'}
      withEdges
      onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
      onFirstPage={() => table.firstPage()}
      onLastPage={() => table.lastPage()}
      onNextPage={() => table.nextPage()}
      onPreviousPage={() => table.previousPage()}
      total={table.getPageCount()}
      siblings={1}
    />
  );
}
