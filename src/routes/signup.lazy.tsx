import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUp } from '@notes/views';

export const Route = createLazyFileRoute('/signup')({
  component: SignUp
});
