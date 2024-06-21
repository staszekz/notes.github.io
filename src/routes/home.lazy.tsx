import { Home } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/home')({
  component: Home
});
