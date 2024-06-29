import { createLazyFileRoute } from '@tanstack/react-router';
import { SignIn } from '@notes/components';

export const signinRoute = createLazyFileRoute('/signin')({
  component: SignIn
});
