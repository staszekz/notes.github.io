import { AuthView } from '@notes/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: AuthView
});