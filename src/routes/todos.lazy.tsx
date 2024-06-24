import { Todos } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/todos')({
  component: Todos
});
