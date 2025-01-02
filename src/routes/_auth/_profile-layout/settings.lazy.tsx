import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/_profile-layout/settings')({
  component: Settings
});

function Settings() {
  return <h1>Settings</h1>;
}
