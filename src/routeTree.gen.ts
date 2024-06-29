/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const TodosLazyImport = createFileRoute('/todos')()
const SignupLazyImport = createFileRoute('/signup')()
const SigninLazyImport = createFileRoute('/signin')()
const NotesLazyImport = createFileRoute('/notes')()
const HomeLazyImport = createFileRoute('/home')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TodosLazyRoute = TodosLazyImport.update({
  path: '/todos',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/todos.lazy').then((d) => d.Route))

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const SigninLazyRoute = SigninLazyImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signin.lazy').then((d) => d.Route))

const NotesLazyRoute = NotesLazyImport.update({
  path: '/notes',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notes.lazy').then((d) => d.Route))

const HomeLazyRoute = HomeLazyImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/home.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeLazyImport
      parentRoute: typeof rootRoute
    }
    '/notes': {
      id: '/notes'
      path: '/notes'
      fullPath: '/notes'
      preLoaderRoute: typeof NotesLazyImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninLazyImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/todos': {
      id: '/todos'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof TodosLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  HomeLazyRoute,
  NotesLazyRoute,
  SigninLazyRoute,
  SignupLazyRoute,
  TodosLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/home",
        "/notes",
        "/signin",
        "/signup",
        "/todos"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/home": {
      "filePath": "home.lazy.tsx"
    },
    "/notes": {
      "filePath": "notes.lazy.tsx"
    },
    "/signin": {
      "filePath": "signin.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
    },
    "/todos": {
      "filePath": "todos.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
