import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '@notes/components';

export const Route = createFileRoute('/signin')({
  component: SignIn
});
