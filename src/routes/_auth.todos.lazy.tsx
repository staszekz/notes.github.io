import { Todos } from '@notes/views';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/todos')({
  component: Todos
});
