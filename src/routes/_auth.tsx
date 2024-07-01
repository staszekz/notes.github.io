import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    console.log({ context });
    if (!context.auth?.currentUser) {
      throw redirect({
        to: '/login'
        // search: {
        //   redirect: location.href,
        // },
      });
    }
  }
});
