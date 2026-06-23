# content-manager

Sanity Studio for managing blog content on [hemantsingh.dev](https://hemantsingh.dev). This is the editing interface — write, publish, and preview blog posts here. The public site (`apps/web`) picks them up automatically via webhook-triggered cache revalidation.

## What it does

- Provides a Studio UI for creating and editing blog posts
- Imports the content schema from `@repo/sanity-schema` (the shared `packages/sanity` package) — schema changes are made there, not here
- Connects to the live Next.js site via Sanity's **Presentation** tool for live-preview of unpublished drafts
- Deploys as a hosted Sanity Studio (via `sanity deploy`)

## Stack

| Layer   | Choice                                                        |
| ------- | ------------------------------------------------------------- |
| Studio  | Sanity Studio v3                                              |
| Schema  | `@repo/sanity-schema` (workspace package)                     |
| Plugins | `@sanity/vision`, `@sanity/code-input`, `sanity/presentation` |
| Theme   | Custom (`src/theme/`) — matches the portfolio's visual style  |

## Running locally

```bash
# From the repo root
pnpm dev:studio

# Or, from this directory
pnpm dev
```

The Studio runs at `http://localhost:3333` by default.

## Environment variables

Copy `.env.example` to `.env` and fill in:

```bash
cp .env.example .env
```

| Variable                    | Description                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `SANITY_STUDIO_PROJECT_ID`  | Your Sanity project ID (find it at sanity.io/manage)                               |
| `SANITY_STUDIO_DATASET`     | Dataset name — typically `production`                                              |
| `SANITY_STUDIO_PREVIEW_URL` | URL of the Next.js site to use for live preview (default: `http://localhost:3000`) |

## Scripts

| Script        | What it does                             |
| ------------- | ---------------------------------------- |
| `pnpm dev`    | Starts the Studio dev server             |
| `pnpm build`  | Builds the Studio for self-hosting       |
| `pnpm deploy` | Deploys the Studio to Sanity's hosting   |
| `pnpm start`  | Serves a previously built Studio locally |

## Deployment

To deploy the Studio to Sanity's hosted infrastructure:

```bash
pnpm deploy
```

The deployed Studio URL should match the `SANITY_STUDIO_URL` variable in `apps/web/.env` so CORS is configured correctly.

## Adding content

See `packages/sanity` for the schema definitions. Changing the content model (adding fields, new document types) is done there — the Studio picks up changes automatically because it imports the schema as a workspace dependency.
