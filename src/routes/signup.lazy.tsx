import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUp } from '@notes/components';

export const Route = createLazyFileRoute('/signup')({
  component: SignUp
});
