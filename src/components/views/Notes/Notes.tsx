import React, { useCallback, useState } from 'react';
import { openDeleteModal, openDetailsModal, openModal, StyledH1, StyledH2, Table } from '@notes/components';
import { StyledNotesList } from './styled';
import { MainLayout } from '@notes/layout';
import { ActionIcon, Button, Checkbox, Flex, LoadingOverlay, Text, Tooltip } from '@mantine/core';
import { IconEdit, IconTrash, IconBubbleText } from '@tabler/icons-react';
import { useNotes } from '@notes/hooks';
import { AddNewButton } from 'src/components/button-link/add-new-button';
import classes from './notes-table.module.css';
import { AddTask } from 'src/components/Form/Form';
import { createColumnHelper, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table';
import { Note } from '@notes/types';

const TableIcons = ({ openDetailsModal, openDeleteModal, openEditModal }) => {
  return (
    <Flex gap="md" justify="center">
      <Tooltip label="Edit">
        <ActionIcon onClick={openEditModal}>
          <IconEdit />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon color="red" onClick={openDeleteModal}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      {/* <Tooltip label="Select as done">
        <Checkbox />
      </Tooltip> */}
      <Tooltip label="Show more">
        <ActionIcon color={'var(--primary)'} onClick={openDetailsModal}>
          <IconBubbleText />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export const Notes = () => {
  const {
    notes: { isPending, isFetching, isLoading, data: notes },
    addNewNote,
    editNote,
    deleteNote
  } = useNotes();

  const columnHelper = createColumnHelper<Note>();

  // dodać tez last modified on
  const columns = [
    columnHelper.accessor('title', {
      header: 'Title'
    }),
    columnHelper.accessor('created', {
      header: 'Created'
    }),
    columnHelper.accessor('content', {
      header: 'Content'
    }),
    columnHelper.display({
      header: 'Actions',
      cell: props => {
        return (
          <TableIcons
            openDetailsModal={() => openDetailsModal(props.row.original.content)}
            openDeleteModal={() => openDeleteModal(props.row.original.id, deleteNote.mutate)}
            openEditModal={() => openModal(props.row.original, editNote.mutate)}
          />
        );
      }
    })
  ];

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3
  });
  const table = useReactTable({
    columns,
    data: notes || [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    manualPagination: true
  });
  //   state: {
  //     showLoadingOverlay: isFetching,
  //     showSkeletons: isLoading,
  //   },
  //   enableRowSelection: true,
  //   mantineTableProps: {
  //     className: classes.table,
  //     highlightOnHover: false,
  //     striped: 'odd',
  //     withColumnBorders: true,
  //     withRowBorders: true,
  //     withTableBorder: true,
  //   },
  //   mantinePaperProps: {
  //     className: classes.table,
  //   },
  //   createDisplayMode: 'modal',
  //   editDisplayMode: 'modal',
  //   enableEditing: true,
  //   renderTopToolbarCustomActions: () => <AddNewButton onClick={openModal} />,
  //   paginationDisplayMode: 'pages',
  //   renderRowActions: ({ row, table }) => (
  //     <Flex gap="md">
  //       <Tooltip label="Edit">
  //         <ActionIcon
  //           onClick={() => {
  //             console.log(row)
  //             openModal();
  //           }}
  //         >
  //           <IconEdit />
  //         </ActionIcon>
  //       </Tooltip>
  //       <Tooltip label="Delete">
  //         <ActionIcon onClick={()=> openDeleteModal(row.original.id)} color="red">
  //           <IconTrash />
  //         </ActionIcon>
  //       </Tooltip>
  //     </Flex>
  //   ),
  // });

  return (
    <MainLayout>
      <StyledNotesList>
        <StyledH1>My Private Notes</StyledH1>
        <AddNewButton openModal={openModal} />
        <br />
        <Table table={table} isLoading={isLoading} />

        {!notes?.length && <StyledH2>Your note list is empty! Enter a new note! </StyledH2>}
      </StyledNotesList>
    </MainLayout>
  );
};
