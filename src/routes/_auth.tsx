import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.user?.emailVerified) {
      throw redirect({
        to: '/login'
      });
    }
  }
});
