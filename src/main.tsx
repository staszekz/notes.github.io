import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import './index.css';
import { Outlet, RouterProvider, createRootRoute, createRouter } from '@tanstack/react-router';

import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
