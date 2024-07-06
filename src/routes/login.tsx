import { AuthView } from '@notes/views';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: AuthView
});
