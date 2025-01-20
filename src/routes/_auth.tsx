import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuth } from 'firebase/auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async () => {
    const auth = getAuth();
    if (!auth?.currentUser?.emailVerified) {
      throw redirect({
        to: '/login'
      });
    }
  }
});
