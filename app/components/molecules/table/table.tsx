import { Table as MantineTable } from '@mantine/core';
import { flexRender, Table as TTable } from '@tanstack/react-table';
import { Pagination } from '@notes/components';
import classes from './table.module.css';

export function Table<T>({ table }: { table: TTable<T> }) {
  return (
    <div className={classes.tableWrapper}>
      <MantineTable stickyHeader striped highlightOnHover>
        <MantineTable.Thead bg={'var(--primary)'} c={'var(--white'}>
          {table.getHeaderGroups().map(headerGroup => (
            <MantineTable.Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <MantineTable.Th fz={'md'} ta={'center'} key={header.id} w="fit-content">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </MantineTable.Th>
                );
              })}
            </MantineTable.Tr>
          ))}
        </MantineTable.Thead>

        <MantineTable.Tbody className={classes.tableBody}>
          {table.getRowModel().rows.map(row => (
            <MantineTable.Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <MantineTable.Td fz={'md'} className={classes.tableCell} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </MantineTable.Td>
              ))}
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
      <Pagination table={table} />
    </div>
  );
}
