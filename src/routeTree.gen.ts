/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthProfileLayoutImport } from './routes/_auth/_profile-layout'
import { Route as AuthMainLayoutImport } from './routes/_auth/_main-layout'
import { Route as AuthMainLayoutIndexImport } from './routes/_auth/_main-layout/index'
import { Route as AuthMainLayoutTodosImport } from './routes/_auth/_main-layout/todos'
import { Route as AuthMainLayoutNotesImport } from './routes/_auth/_main-layout/notes'

// Create Virtual Routes

const VerifyEmailLazyImport = createFileRoute('/verify-email')()
const SignupLazyImport = createFileRoute('/signup')()
const SigninLazyImport = createFileRoute('/signin')()
const ResetPasswordLazyImport = createFileRoute('/reset-password')()
const AuthProfileLayoutSettingsLazyImport = createFileRoute(
  '/_auth/_profile-layout/settings',
)()
const AuthProfileLayoutProfileLazyImport = createFileRoute(
  '/_auth/_profile-layout/profile',
)()

// Create/Update Routes

const VerifyEmailLazyRoute = VerifyEmailLazyImport.update({
  path: '/verify-email',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/verify-email.lazy').then((d) => d.Route))

const SignupLazyRoute = SignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signup.lazy').then((d) => d.Route))

const SigninLazyRoute = SigninLazyImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/signin.lazy').then((d) => d.Route))

const ResetPasswordLazyRoute = ResetPasswordLazyImport.update({
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/reset-password.lazy').then((d) => d.Route),
)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthProfileLayoutRoute = AuthProfileLayoutImport.update({
  id: '/_profile-layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMainLayoutRoute = AuthMainLayoutImport.update({
  id: '/_main-layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthMainLayoutIndexRoute = AuthMainLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => AuthMainLayoutRoute,
} as any)

const AuthProfileLayoutSettingsLazyRoute =
  AuthProfileLayoutSettingsLazyImport.update({
    path: '/settings',
    getParentRoute: () => AuthProfileLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_auth/_profile-layout/settings.lazy').then((d) => d.Route),
  )

const AuthProfileLayoutProfileLazyRoute =
  AuthProfileLayoutProfileLazyImport.update({
    path: '/profile',
    getParentRoute: () => AuthProfileLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_auth/_profile-layout/profile.lazy').then((d) => d.Route),
  )

const AuthMainLayoutTodosRoute = AuthMainLayoutTodosImport.update({
  path: '/todos',
  getParentRoute: () => AuthMainLayoutRoute,
} as any)

const AuthMainLayoutNotesRoute = AuthMainLayoutNotesImport.update({
  path: '/notes',
  getParentRoute: () => AuthMainLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordLazyImport
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
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_main-layout': {
      id: '/_auth/_main-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthMainLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_profile-layout': {
      id: '/_auth/_profile-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthProfileLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_main-layout/notes': {
      id: '/_auth/_main-layout/notes'
      path: '/notes'
      fullPath: '/notes'
      preLoaderRoute: typeof AuthMainLayoutNotesImport
      parentRoute: typeof AuthMainLayoutImport
    }
    '/_auth/_main-layout/todos': {
      id: '/_auth/_main-layout/todos'
      path: '/todos'
      fullPath: '/todos'
      preLoaderRoute: typeof AuthMainLayoutTodosImport
      parentRoute: typeof AuthMainLayoutImport
    }
    '/_auth/_profile-layout/profile': {
      id: '/_auth/_profile-layout/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthProfileLayoutProfileLazyImport
      parentRoute: typeof AuthProfileLayoutImport
    }
    '/_auth/_profile-layout/settings': {
      id: '/_auth/_profile-layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthProfileLayoutSettingsLazyImport
      parentRoute: typeof AuthProfileLayoutImport
    }
    '/_auth/_main-layout/': {
      id: '/_auth/_main-layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthMainLayoutIndexImport
      parentRoute: typeof AuthMainLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthMainLayoutRouteChildren {
  AuthMainLayoutNotesRoute: typeof AuthMainLayoutNotesRoute
  AuthMainLayoutTodosRoute: typeof AuthMainLayoutTodosRoute
  AuthMainLayoutIndexRoute: typeof AuthMainLayoutIndexRoute
}

const AuthMainLayoutRouteChildren: AuthMainLayoutRouteChildren = {
  AuthMainLayoutNotesRoute: AuthMainLayoutNotesRoute,
  AuthMainLayoutTodosRoute: AuthMainLayoutTodosRoute,
  AuthMainLayoutIndexRoute: AuthMainLayoutIndexRoute,
}

const AuthMainLayoutRouteWithChildren = AuthMainLayoutRoute._addFileChildren(
  AuthMainLayoutRouteChildren,
)

interface AuthProfileLayoutRouteChildren {
  AuthProfileLayoutProfileLazyRoute: typeof AuthProfileLayoutProfileLazyRoute
  AuthProfileLayoutSettingsLazyRoute: typeof AuthProfileLayoutSettingsLazyRoute
}

const AuthProfileLayoutRouteChildren: AuthProfileLayoutRouteChildren = {
  AuthProfileLayoutProfileLazyRoute: AuthProfileLayoutProfileLazyRoute,
  AuthProfileLayoutSettingsLazyRoute: AuthProfileLayoutSettingsLazyRoute,
}

const AuthProfileLayoutRouteWithChildren =
  AuthProfileLayoutRoute._addFileChildren(AuthProfileLayoutRouteChildren)

interface AuthRouteChildren {
  AuthMainLayoutRoute: typeof AuthMainLayoutRouteWithChildren
  AuthProfileLayoutRoute: typeof AuthProfileLayoutRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthMainLayoutRoute: AuthMainLayoutRouteWithChildren,
  AuthProfileLayoutRoute: AuthProfileLayoutRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthProfileLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/signin': typeof SigninLazyRoute
  '/signup': typeof SignupLazyRoute
  '/verify-email': typeof VerifyEmailLazyRoute
  '/notes': typeof AuthMainLayoutNotesRoute
  '/todos': typeof AuthMainLayoutTodosRoute
  '/profile': typeof AuthProfileLayoutProfileLazyRoute
  '/settings': typeof AuthProfileLayoutSettingsLazyRoute
  '/': typeof AuthMainLayoutIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthProfileLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/signin': typeof SigninLazyRoute
  '/signup': typeof SignupLazyRoute
  '/verify-email': typeof VerifyEmailLazyRoute
  '/notes': typeof AuthMainLayoutNotesRoute
  '/todos': typeof AuthMainLayoutTodosRoute
  '/profile': typeof AuthProfileLayoutProfileLazyRoute
  '/settings': typeof AuthProfileLayoutSettingsLazyRoute
  '/': typeof AuthMainLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/reset-password': typeof ResetPasswordLazyRoute
  '/signin': typeof SigninLazyRoute
  '/signup': typeof SignupLazyRoute
  '/verify-email': typeof VerifyEmailLazyRoute
  '/_auth/_main-layout': typeof AuthMainLayoutRouteWithChildren
  '/_auth/_profile-layout': typeof AuthProfileLayoutRouteWithChildren
  '/_auth/_main-layout/notes': typeof AuthMainLayoutNotesRoute
  '/_auth/_main-layout/todos': typeof AuthMainLayoutTodosRoute
  '/_auth/_profile-layout/profile': typeof AuthProfileLayoutProfileLazyRoute
  '/_auth/_profile-layout/settings': typeof AuthProfileLayoutSettingsLazyRoute
  '/_auth/_main-layout/': typeof AuthMainLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/notes'
    | '/todos'
    | '/profile'
    | '/settings'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/notes'
    | '/todos'
    | '/profile'
    | '/settings'
    | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/reset-password'
    | '/signin'
    | '/signup'
    | '/verify-email'
    | '/_auth/_main-layout'
    | '/_auth/_profile-layout'
    | '/_auth/_main-layout/notes'
    | '/_auth/_main-layout/todos'
    | '/_auth/_profile-layout/profile'
    | '/_auth/_profile-layout/settings'
    | '/_auth/_main-layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
  ResetPasswordLazyRoute: typeof ResetPasswordLazyRoute
  SigninLazyRoute: typeof SigninLazyRoute
  SignupLazyRoute: typeof SignupLazyRoute
  VerifyEmailLazyRoute: typeof VerifyEmailLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
  ResetPasswordLazyRoute: ResetPasswordLazyRoute,
  SigninLazyRoute: SigninLazyRoute,
  SignupLazyRoute: SignupLazyRoute,
  VerifyEmailLazyRoute: VerifyEmailLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/login",
        "/reset-password",
        "/signin",
        "/signup",
        "/verify-email"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_main-layout",
        "/_auth/_profile-layout"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/reset-password": {
      "filePath": "reset-password.lazy.tsx"
    },
    "/signin": {
      "filePath": "signin.lazy.tsx"
    },
    "/signup": {
      "filePath": "signup.lazy.tsx"
    },
    "/verify-email": {
      "filePath": "verify-email.lazy.tsx"
    },
    "/_auth/_main-layout": {
      "filePath": "_auth/_main-layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_main-layout/notes",
        "/_auth/_main-layout/todos",
        "/_auth/_main-layout/"
      ]
    },
    "/_auth/_profile-layout": {
      "filePath": "_auth/_profile-layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_profile-layout/profile",
        "/_auth/_profile-layout/settings"
      ]
    },
    "/_auth/_main-layout/notes": {
      "filePath": "_auth/_main-layout/notes.tsx",
      "parent": "/_auth/_main-layout"
    },
    "/_auth/_main-layout/todos": {
      "filePath": "_auth/_main-layout/todos.tsx",
      "parent": "/_auth/_main-layout"
    },
    "/_auth/_profile-layout/profile": {
      "filePath": "_auth/_profile-layout/profile.lazy.tsx",
      "parent": "/_auth/_profile-layout"
    },
    "/_auth/_profile-layout/settings": {
      "filePath": "_auth/_profile-layout/settings.lazy.tsx",
      "parent": "/_auth/_profile-layout"
    },
    "/_auth/_main-layout/": {
      "filePath": "_auth/_main-layout/index.tsx",
      "parent": "/_auth/_main-layout"
    }
  }
}
ROUTE_MANIFEST_END */
