import { Home } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const homeRoute = createLazyFileRoute('/home')({
  component: Home
});
