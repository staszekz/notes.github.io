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
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      {/* <App> */}
      <RouterProvider router={router} />
      {/* </App> */}
    </StrictMode>
  );
}
