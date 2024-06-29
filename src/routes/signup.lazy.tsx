import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router';
import { SignUp } from '@notes/components';

export const signupRoute = createLazyFileRoute('/signup')({
  component: SignUp
});
