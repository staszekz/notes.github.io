import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import './index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
// import { routeTree } from './routeTree.gen'

import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// const TanStackRouterDevtools =
//   process.env.NODE_ENV === 'production'
//     ? () => null // Render nothing in production
//     : React.lazy(() =>
//         // Lazy load in development
//         import('@tanstack/router-devtools').then((res) => ({
//           default: res.TanStackRouterDevtools,
//           // For Embedded Mode
//           // default: res.TanStackRouterDevtoolsPanel
//         })),
//       )
const router = createRouter({
  // routeTree,
  defaultPreload: 'intent'
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    {/* <TanStackRouterDevtools router={router}/> */}
    <App />
  </React.StrictMode>
);
