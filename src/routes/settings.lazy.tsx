import { createLazyFileRoute } from '@tanstack/react-router';
import { Settings } from '@notes/views';

export const Route = createLazyFileRoute('/settings')({
  component: Settings
});
