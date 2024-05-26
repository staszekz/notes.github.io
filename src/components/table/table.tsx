import { LoadingOverlay, Table as MantineTable, Pagination, Text } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import classes from './table.module.css';

export function Table({ table, isLoading }) {
  return (
    <div className={classes.tableWrapper}>
      <MantineTable stickyHeader striped highlightOnHover>
        <MantineTable.Thead bg={'var(--primary)'} c={'var(--white-text'}>
          {table.getHeaderGroups().map(headerGroup => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <MantineTable.Th ta={'center'} key={header.id} w="fit-content">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>

        <MantineTable.Tbody className={classes.tableBody}>
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 1 }} />
          {table.getRowModel().rows.map(row => (
            <MantineTable.Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <MantineTable.Td className={classes.tableCell} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </MantineTable.Td>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
      <Pagination
        p={4}
        color={'var(--darg-bg-color)'}
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
    </div>
  );
}
