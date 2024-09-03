import { ResetPassword } from '@notes/views';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/reset-password')({
  component: ResetPassword
});
