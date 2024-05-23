import React from 'react';
import { LoadingOverlay, Table as MantineTable, Skeleton } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import classes from './table.module.css'

export function Table({ table,isLoading }) {
  return (

    <MantineTable stickyHeader striped highlightOnHover >
      <MantineTable.Thead bg={'var(--primary)'} c={'var(--white-text'}>
        {table.getHeaderGroups().map(headerGroup => (
          <MantineTable.Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <MantineTable.Th ta={'center'} key={header.id} >{
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                }</MantineTable.Th>)
            })}
          </MantineTable.Tr>))}
      </MantineTable.Thead>
      
      <MantineTable.Tbody className={classes.tableBody}>
    <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 1 }} />
        {table.getRowModel().rows.map(row => (
          <MantineTable.Tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <MantineTable.Td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MantineTable.Td>
            ))}
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
}
