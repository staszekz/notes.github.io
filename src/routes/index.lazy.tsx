import { PublicHomepage } from '@notes/components';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: PublicHomepage
});
