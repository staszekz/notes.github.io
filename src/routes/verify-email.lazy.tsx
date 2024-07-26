import { VerifyEmail } from '@notes/views';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/verify-email')({
  component: VerifyEmail
});
