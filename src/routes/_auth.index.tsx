import { Home } from '@notes/views';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  component: Home
});
