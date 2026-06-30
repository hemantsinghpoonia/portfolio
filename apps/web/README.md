<p align="center">
  <strong>Hemant Singh</strong> — Personal Portfolio
</p>

<p align="center">
  A full-stack portfolio site built with Next.js 16 — warm, quiet, and minimal.
</p>

<p align="center">
  <a href="https://hemantsingh.dev">Live site</a>
</p>

---

## About

The public-facing portfolio site. Built from scratch to have full control over the design and to practice production-grade patterns: typed data flows, ISR with on-demand revalidation, structured SEO metadata, image optimization, and a contact pipeline backed by a real database and transactional email.

## Stack

| Layer               | Choice                                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router)                                                 |
| Language            | TypeScript                                                              |
| Styling             | Tailwind CSS v4                                                         |
| UI primitives       | shadcn/ui, Radix UI                                                     |
| CMS                 | Sanity (via `@repo/sanity-schema`)                                      |
| ORM                 | Prisma (`@prisma/adapter-pg`)                                           |
| Database            | PostgreSQL                                                              |
| Email               | Brevo (transactional)                                                   |
| Rate limiting       | Upstash Redis (sliding window, 3 req/hr per IP on the contact endpoint) |
| Syntax highlighting | Shiki                                                                   |
| Fonts               | Playfair Display (display), Geist (body) — self-hosted via `next/font`  |
| Tooling             | pnpm workspaces, ESLint, React Compiler                                 |

## Structure

```
src/
├── app/
│   ├── page.tsx              Single-page layout (Hero → About → Projects → Skills → Blog → Contact)
│   ├── layout.tsx            Root layout, fonts, global metadata
│   ├── blog/
│   │   ├── page.tsx          Blog listing page
│   │   └── [slug]/page.tsx   Individual post page (ISR, 3hr revalidation)
│   ├── api/
│   │   ├── contact/          Contact form endpoint (validation → rate limit → DB → Brevo)
│   │   ├── draft-mode/       Sanity draft mode enable/disable
│   │   └── revalidate/       Sanity webhook → on-demand ISR cache revalidation
│   ├── manifest.ts           Web app manifest
│   ├── robots.ts             robots.txt
│   └── sitemap.ts            Dynamic sitemap (includes blog post slugs)
├── components/
│   ├── hero.tsx              Landing section
│   ├── about.tsx
│   ├── projects.tsx          Project showcase with ProjectCard
│   ├── skills.tsx
│   ├── blog-teaser.tsx       Blog preview carousel on the home page
│   ├── contact.tsx           Contact section (wraps ContactForm)
│   ├── contact-form.tsx      Client form — react-hook-form + Zod validation
│   ├── sidebar.tsx           Fixed sidebar (desktop)
│   ├── mobile-nav.tsx        Mobile navigation drawer
│   ├── footer.tsx
│   ├── json-ld.tsx           JSON-LD structured data injector
│   ├── blog/                 Blog-specific components (PortableText, CodeBlock, YouTubeEmbed, …)
│   └── ui/                   shadcn primitives (Button, Card, Badge, Input, …)
├── lib/
│   ├── posts.ts              Sanity query wrappers (allPosts, postBySlug, …)
│   ├── sanity-fetch.ts       Typed sanityFetch with draft-mode awareness
│   ├── prisma.ts             Prisma client singleton
│   ├── brevo.ts              Brevo client singleton
│   ├── ratelimit.ts          Upstash sliding-window rate limiter
│   ├── jsonld.ts             JSON-LD schema builders (Article, …)
│   ├── utils.ts              cn(), formatDate(), escapeHtml(), …
│   └── validations/
│       └── contact.ts        Zod schema for the contact form payload
└── db/
    └── generated/prisma/     Generated Prisma client (git-ignored)
```

## Pages & routes

| Route                     | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `/`                       | Single-page portfolio (Hero, About, Projects, Skills, Blog, Contact)   |
| `/blog`                   | Blog listing, fetched from Sanity                                      |
| `/blog/[slug]`            | Individual post; ISR with revalidation based on tags and static params |
| `/api/contact`            | POST — validates, rate-limits, persists to DB, fires Brevo email       |
| `/api/revalidate`         | POST — Sanity webhook; revalidates `blog-content` and per-slug tags    |
| `/api/draft-mode/enable`  | GET — enables Next.js draft mode for Sanity live preview               |
| `/api/draft-mode/disable` | GET — disables draft mode and redirects to `/`                         |

## Contact form pipeline

1. Client submits (react-hook-form + Zod).
2. `POST /api/contact` — validates the body against the Zod schema.
3. Checks rate limit via Upstash Redis (3 submissions per IP per hour, sliding window).
4. Persists the message to PostgreSQL (`ContactMessage` model, status: `PENDING`).
5. Fires a transactional email via Brevo; on success, marks the record `NOTIFIED`. If Brevo fails, the record stays `PENDING` (the message is never lost).

## Blog pipeline

Blog posts are authored in `apps/content-manager` (Sanity Studio) and fetched by this app via the shared `@repo/sanity-schema` package. When a post is published or updated, Sanity fires a webhook to `/api/revalidate`, which calls `revalidateTag` to purge the relevant cache entries on demand — no full redeploys needed.

Draft mode is also supported: editors can preview unpublished content in the live site via Sanity's Presentation tool.

## Running locally

```bash
# From the repo root
pnpm install

# Or, from this directory
pnpm dev
```

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Environment variables

| Variable                        | Required | Description                                                           |
| ------------------------------- | -------- | --------------------------------------------------------------------- |
| `DATABASE_URL`                  | Yes      | PostgreSQL connection string                                          |
| `BREVO_API_KEY`                 | Yes      | Brevo API key for transactional email                                 |
| `UPSTASH_REDIS_REST_URL`        | Yes      | Upstash Redis REST URL (for rate limiting)                            |
| `UPSTASH_REDIS_REST_TOKEN`      | Yes      | Upstash Redis REST token                                              |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes      | Sanity project ID (public)                                            |
| `NEXT_PUBLIC_SANITY_DATASET`    | Yes      | Sanity dataset name (e.g. `production`)                               |
| `SANITY_API_READ_TOKEN`         | Yes      | Sanity read token (for draft mode)                                    |
| `SANITY_REVALIDATE_SECRET`      | Yes      | Shared secret to verify Sanity webhook signatures                     |
| `SANITY_STUDIO_URL`             | Yes      | URL of the deployed Sanity Studio (for CORS and presentation tool)    |
| `ALLOWED_DEV_ORIGIN`            | No       | Extra allowed origin for `next dev` (useful for cross-device testing) |
| `APP_URL`                       | Yes      | URL of the web app                                                    |

### Database setup

The Prisma client is generated automatically on `pnpm install` (via the `postinstall` script). To push the schema to your database:

```bash
npx prisma db push
# or
npx prisma migrate dev
```

## Scripts

| Script       | What it does                             |
| ------------ | ---------------------------------------- |
| `pnpm dev`   | Starts the Next.js dev server            |
| `pnpm build` | Runs `prisma generate` then `next build` |
| `pnpm start` | Starts the production server             |
| `pnpm lint`  | Runs ESLint                              |
