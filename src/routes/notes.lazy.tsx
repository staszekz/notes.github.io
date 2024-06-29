import { Notes } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const notesRoute = createLazyFileRoute('/notes')({
  component: Notes
});
