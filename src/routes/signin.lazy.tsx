import { createLazyFileRoute } from '@tanstack/react-router';
import { SignIn } from '@notes/components';

export const Route = createLazyFileRoute('/signin')({
  component: SignIn
});
