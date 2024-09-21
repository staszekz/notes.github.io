import { createLazyFileRoute } from '@tanstack/react-router';
import { Profile } from '@notes/views';

export const Route = createLazyFileRoute('/profile')({
  component: Profile
});
