import { NoteWithId, ControlConfig } from '@notes/types';
import { getTableControls } from '@notes/utils';
import { IconEdit, IconTrash, IconBubbleText } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/table-core';
import { TableControls, openNoteModal, openDeleteModal, openNoteDetailsModal } from 'src/components/molecules';

const columnHelper = createColumnHelper<NoteWithId>();

export const columns = ({ removeNote }) => [
  columnHelper.display({
    header: '#',
    cell: props => {
      return <span>{props.row.index + 1}</span>;
    }
  }),
  columnHelper.accessor('title', {
    header: 'Title'
  }),
  columnHelper.accessor('createdOn', {
    header: 'Created',
    cell: props => {
      return <span>{props.row.original.createdOn.toDate().toLocaleString()}</span>;
    }
  }),
  columnHelper.accessor('content', {
    header: 'Content'
  }),
  columnHelper.display({
    header: 'Actions',
    cell: props => <TableControls controls={getTableControls(props.row.original, controlsConfig({ removeNote }))} />
  })
];

const controlsConfig = ({ removeNote }): ControlConfig<NoteWithId> => ({
  Edit: {
    onClick: openNoteModal,
    icon: <IconEdit />,
    color: 'var(--secondary)',
    tooltipMessage: 'Edit this note'
  },
  Delete: {
    onClick: original => openDeleteModal(original.id, removeNote),
    icon: <IconTrash />,
    color: 'var(--red)',
    tooltipMessage: 'Delete this note'
  },
  Details: {
    onClick: openNoteDetailsModal,
    icon: <IconBubbleText />,
    color: 'var(--primary)',
    tooltipMessage: 'See more details'
  }
});
