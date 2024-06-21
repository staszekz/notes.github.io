import { SignIn } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/signin')({
  component: SignIn
});
