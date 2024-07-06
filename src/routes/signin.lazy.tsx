import { createLazyFileRoute } from '@tanstack/react-router';
import { SignIn } from '@notes/views';

export const Route = createLazyFileRoute('/signin')({
  component: SignIn
});
