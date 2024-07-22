import { Home } from '@notes/views';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  // component: () => {
  //   if (!isAuthenticated()) {
  //     return <div style={{ color: 'white' }}>Loading...</div>;
  //   }

  //   return <Home />;
  // },
  component: Home,
  pendingComponent: () => <div style={{ color: 'white' }}>Loading...</div>
});
