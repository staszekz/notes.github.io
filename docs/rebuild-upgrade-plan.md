# Rebuild and Upgrade Plan

This document defines a phased, low-risk strategy to improve code quality, delivery confidence, and maintainability without blocking feature work.

## Goals

- Stabilize build and dependency hygiene.
- Standardize architecture patterns across routes, hooks, and data access.
- Introduce reliable automated testing.
- Improve UX resilience (error, loading, and async edge cases).
- Enable predictable, incremental upgrades.

## Guiding Principles

- Prefer small, independently releasable pull requests.
- Keep refactors separate from feature changes.
- Maintain behavior parity unless a change is explicitly approved.
- Add tests for each critical user flow touched.

## Phase 0 - Baseline and Safety (1-2 days)

### Phase 0 Deliverables

- Reproducible local setup instructions and env variable checklist.
- Baseline runbook for:
  - `npm run build`
  - `npm run test`
  - `npm run test:coverage`
- Single package manager decision (`npm` or `pnpm`) with one lockfile as source of truth.

### Phase 0 Exit Criteria

- The app builds locally from a clean clone.
- Team can run core commands without local guesswork.

## Phase 1 - Tooling and Config Hygiene (2-4 days)

### Phase 1 Deliverables

- Remove duplicated/unused bundler plugin imports and config drift.
- Keep runtime dependencies and dev dependencies clearly separated.
- Add CI checks for typecheck, lint, and tests on every pull request.
- Document contribution workflow and local quality gates.

### Phase 1 Exit Criteria

- CI fails fast on regressions in typing, lint, or tests.
- Config is minimal and unambiguous.

## Phase 2 - Architecture Stabilization (4-7 days)

### Phase 2 Deliverables

- Formalize data access conventions for Firebase operations.
- Consolidate error mapping and notification behavior in async workflows.
- Standardize form handling pattern (TanStack Form + Zod).
- Keep route files focused on composition, move logic into hooks/services.

### Phase 2 Exit Criteria

- New code follows one predictable shape for auth, data fetching, and mutations.
- Reduced duplication in form and mutation logic.

## Phase 3 - Test Foundation (4-6 days)

### Phase 3 Deliverables

- Unit tests for critical hooks:
  - auth
  - collection mutations
  - query option factories
- Integration tests for core flows:
  - sign in
  - create/edit/delete note
  - create/edit/delete todo
- One e2e smoke test for login-to-action path.

### Phase 3 Exit Criteria

- Core user journeys are covered by automated tests.
- Regressions are caught before merge.

## Phase 4 - UX and Reliability Hardening (3-5 days)

### Phase 4 Deliverables

- Improve error boundaries and fallback UI consistency.
- Strengthen loading state behavior for route transitions and mutations.
- Add validation/guardrails for profile update and avatar upload edge cases.
- Review optimistic update rollback correctness in failure scenarios.

### Phase 4 Exit Criteria

- Fewer ambiguous failure states for users.
- More consistent feedback during async operations.

## Phase 5 - Incremental Dependency Upgrade Track (ongoing)

### Phase 5 Upgrade Order

1. Tooling and lint ecosystem
2. TanStack libraries
3. Mantine libraries
4. Firebase SDK

### Phase 5 Process Per Upgrade Batch

- Upgrade a narrow slice only.
- Run full verification:
  - build
  - tests
  - manual smoke checks for auth + notes/todos CRUD
- Record breaking changes and migration notes in this document.

### Phase 5 Exit Criteria

- Upgrades happen continuously with low risk and no long-lived upgrade branch debt.

## Suggested Work Breakdown

- Week 1: Phase 0 + Phase 1
- Week 2: Phase 2
- Week 3: Phase 3
- Week 4: Phase 4
- Ongoing: Phase 5 in small recurring batches

## Tracking Template

Use this checklist for execution:

- [ ] Phase 0 complete
- [ ] Phase 1 complete
- [ ] Phase 2 complete
- [ ] Phase 3 complete
- [ ] Phase 4 complete
- [ ] Phase 5 started

For each phase, track:

- Owner
- Start date
- End date
- Risks
- Decisions taken
- Follow-up actions
