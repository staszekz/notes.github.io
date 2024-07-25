import { RoutesDef } from '@notes/utils';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({
        to: RoutesDef.LOGIN
      });
    }
  }
});
