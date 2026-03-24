# Notes & Todos

Personal productivity app for managing notes and todos with authentication, profile settings, and fast UI interactions.

## Tech Stack

- React 18 + TypeScript
- Vite
- Mantine UI
- TanStack Router (file-based routing)
- TanStack Query (server/cache state)
- TanStack Form + Zod
- Firebase:
  - Authentication
  - Firestore
  - Storage

## Core Features

- Sign up / sign in / reset password / email verification
- Protected routes for authenticated users
- CRUD for notes and todos
- Optimistic updates for smoother UX
- Prefetching notes/todos for faster navigation
- User settings (display name, avatar upload)
- Notifications for async operation feedback

## Project Structure

- `src/routes` - route definitions and page-level UI
- `src/components` - UI components (atoms/molecules/organizms/templates)
- `src/hooks` - app logic (auth, CRUD mutations, prefetching, context hooks)
- `src/rq` - query options + collection management functions
- `src/context` - auth/view providers
- `src/database` - Firebase initialization
- `src/types` - Zod schemas and TypeScript types

## Environment Variables

Create `.env` with Firebase values (used in `src/database/database.ts`):

- `VITE_APP_API_KEY`
- `VITE_APP_AUTH_DOMAIN`
- `VITE_APP_DATABASE_URL`
- `VITE_APP_PROJECT_ID`
- `VITE_APP_STORAGE_BUCKET`
- `VITE_APP_MESSAGING_SENDER_ID`
- `VITE_APP_APP_ID`
- `VITE_APP_MEASUREMENT_ID`

## Scripts

- `npm run start` - start dev server
- `npm run build` - type-check + production build
- `npm run serve` - preview production build
- `npm run test` - run tests (Vitest)
- `npm run test:coverage` - coverage run

## Getting Started

1. Install dependencies:
   - `npm install`
2. Add `.env` variables.
3. Start the app:
   - `npm run start`

## Routing Model

- Public/auth onboarding routes: `/login`, `/signin`, `/signup`, `/reset-password`, `/verify-email`
- Protected routes under `/_auth` require a verified user
- Main application views include notes, todos, profile/settings

## Data Model (high level)

- Firestore path per user: `users/{uid}/notes` and `users/{uid}/todos`
- `Note`: `id`, `title`, `content`, `createdOn`
- `Todo`: `id`, `title`, `content`, `createdOn`, `completed`, `deadline`

## Current Status / Known Gaps

- No test suite implemented yet (despite test tooling being configured)
- Some TODO markers remain in app code
- Build/dependency config can be streamlined in the next refactor phase
