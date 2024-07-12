import { Pagination as ManitinePagination } from '@mantine/core';
import { Table } from '@tanstack/table-core';
// we can have any type of table props, do not care what data are passed
export function Pagination({ table }: { table: Table<any> }) {
  // moze dodać <T extaends any>
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
