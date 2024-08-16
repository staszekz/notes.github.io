import { RoutesDef } from '@notes/utils';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    console.log('🚀 ~ context:', context.auth);

    if (!context.auth?.user?.emailVerified) {
      throw redirect({
        to: RoutesDef.LOGIN
      });
    }
  }
});
