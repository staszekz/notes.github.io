import { Notes } from '@notes/views';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/notes')({
  component: Notes
});
