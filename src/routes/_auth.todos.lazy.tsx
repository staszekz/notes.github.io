import { Todos } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/todos')({
  component: Todos
});
