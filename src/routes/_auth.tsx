import { RoutesDef } from '@notes/utils';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.currentUser) {
      throw redirect({
        to: RoutesDef.LOGIN
      });
    }
  }
});
