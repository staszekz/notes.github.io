import React from 'react';
import { Table as MantineTable, Skeleton } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import classes from './table.module.css'

export function Table({ table }) {
  return (
    <MantineTable stickyHeader striped highlightOnHover >
      <MantineTable.Thead >
        {table.getHeaderGroups().map(headerGroup => (
          <MantineTable.Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <MantineTable.Th key={header.id} className={classes.tableHeaderCell}>{
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                }</MantineTable.Th>)
            })}
          </MantineTable.Tr>))}
      </MantineTable.Thead>

      <MantineTable.Tbody className={classes.tableBody}>
        {table.getRowModel().rows.map(row => (
          <MantineTable.Tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <MantineTable.Td key={cell.id}>
                {false ? <Skeleton height={24} radius="xl" width={'50%'} /> : flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
}
