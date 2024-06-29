import { createFileRoute } from '@tanstack/react-router';
import { SignUp } from '@notes/components';

export const Route = createFileRoute('/signup')({
  component: SignUp
});
