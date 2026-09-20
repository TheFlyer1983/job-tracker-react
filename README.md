# Job Tracker

A kanban board for job applications. Cards sit in columns by status (Saved, Applied, Interview, Offer, Rejected). You can search by title, filter by status, and add, edit, or delete jobs. Each job also has a details page.

The UI is React. A Hono API on port 3000 talks to Postgres through Drizzle. Vite proxies `/api` to that server.

## Stack

- React 19, Vite, TypeScript, Tailwind CSS 4
- React Router and TanStack Query
- Hono (typed RPC client in the frontend)
- Postgres + Drizzle ORM
- Zod for request validation
- Vitest, Testing Library, MSW
- Storybook

Package manager is pnpm.

## Prerequisites

- Node.js
- pnpm
- A local Postgres instance

Create two databases: one for local development, one for API tests. The API tests assert they are connected to `job_tracker_test`.

## Setup

```bash
pnpm install
```

Create a `.env` in the repo root:

```
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/job_tracker
BASE_API_URL=http://localhost:3000
```

`DATABASE_URL` is the Postgres connection string. `BASE_API_URL` is the host Vite proxies `/api` to.

Vite and Drizzle Kit load `.env` on their own. The API does not. Export `DATABASE_URL` before `pnpm api`, or the server will start without a database URL.

Then migrate and seed:

```bash
pnpm db:migrate
pnpm db:seed
```

`pnpm db:reset` drops the database, migrates, and seeds again.

## Run

The API and the Vite app are separate processes. Start both.

```bash
pnpm api
```

Hono listens on http://localhost:3000.

```bash
pnpm dev
```

Vite serves the UI. Requests to `/api` go to `BASE_API_URL`.

```bash
pnpm storybook
```

Storybook is on http://localhost:6006. Component stories use MSW, so they do not need the real API.

## Tests

Vitest has three projects: `unit`, `api`, and `storybook`.

```bash
pnpm test
```

To run one project: `pnpm test --project unit`, `pnpm test --project api`, or `pnpm test --project storybook`.

**Unit.** jsdom tests for components, hooks, providers, and the Hono client. They hit MSW, not Postgres. Setup lives in `src/test/setup.ts`.

**API.** Node tests that call the Hono app and write to the test database. They live in `src/api/__tests__/`. Create a `.env.test`:

```
DATABASE_URL=postgres://USER:PASSWORD@localhost:5432/job_tracker_test
```

Migrate it before the first run:

```bash
pnpm db:migrate:test
```

`src/test/api.setup.ts` loads `.env.test` so these tests do not use your development database.

**Storybook.** Playwright runs the stories in a headless Chromium browser.

```bash
pnpm test:coverage
```

Coverage reports go to `coverage/`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Vite frontend |
| `pnpm api` | Hono API on port 3000 |
| `pnpm build` | Typecheck and production build |
| `pnpm preview` | Serve the production build |
| `pnpm check` | Lint, format check, typecheck |
| `pnpm lint` | Oxlint |
| `pnpm format` | Oxfmt |
| `pnpm test` | Vitest (all projects) |
| `pnpm test:coverage` | Vitest with coverage |
| `pnpm storybook` | Storybook |
| `pnpm db:generate` | Generate a Drizzle migration |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:seed` | Insert the starter jobs |
| `pnpm db:drop` | Reset the database |
| `pnpm db:reset` | Drop, migrate, seed |
| `pnpm db:migrate:test` | Migrate using `.env.test` |

## API

All job routes are under `/api/jobs`. Create and update bodies are validated with Zod (`src/validation/jobs.ts`). `company`, `title`, and `status` are required. `status` must be one of Saved, Applied, Interview, Offer, Rejected. `url`, if present, must be a valid URL.

| Method | Path | Response |
| --- | --- | --- |
| `GET` | `/api/jobs` | 200, array of jobs |
| `GET` | `/api/jobs/:id` | 200, or 404 |
| `POST` | `/api/jobs` | 201, or 400 if invalid |
| `PUT` | `/api/jobs/:id` | 200, 400, or 404 |
| `DELETE` | `/api/jobs/:id` | 204, or 404 |

The frontend client is `src/api/jobs.ts`. It uses Hono's typed client against the app router in `src/api/app.ts`.
