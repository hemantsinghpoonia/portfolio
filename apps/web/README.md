<p align="center">
  <strong>Hemant Singh</strong> — Personal Portfolio
</p>

<p align="center">
  A full-stack portfolio site built with Next.js, designed to be warm, quiet,
  and minimal — the website equivalent of a clean desk.
</p>

<p align="center">
  <a href="https://hemantsingh.dev">Live site</a>
</p>

---

## About

This is my personal portfolio — built from scratch rather than a template,
both to have full control over the design and to use it as a real project
for practicing production-grade frontend and backend patterns: typed data
flows, structured metadata, image optimization, and a contact pipeline
backed by a database and transactional email.

## Stack

| Layer         | Choice                                                                 |
| ------------- | ---------------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                                                |
| Language      | TypeScript                                                             |
| Styling       | Tailwind CSS v4                                                        |
| UI primitives | Shadcn UI, Radix UI                                                    |
| ORM           | Prisma (`@prisma/adapter-pg`)                                          |
| Database      | PostgreSQL                                                             |
| Email         | Brevo (transactional) — _planned_                                      |
| Fonts         | Playfair Display (display), Geist (body) — self-hosted via `next/font` |
| Tooling       | pnpm workspaces, ESLint, React Compiler                                |

## Structure

```
src/
├── app/            routes, layout, metadata, sitemap, robots
│   └── api/contact     contact form endpoint (scaffolded, not yet wired)
├── components/     page sections (hero, about, projects, skills, ...)
│   └── ui/          shadcn primitives (button, card, badge, ...)
├── lib/             utilities, post data, prisma client
└── db/              generated Prisma client output
```

The site is a single long-form landing page (`src/app/page.tsx`) composed of
section components, plus a `/blog` route group fed by static post data in
`src/lib/posts.ts` for now.

## Running locally

```bash
pnpm install
pnpm dev
```

Needs a `.env` with :

```
DATABASE_URL=
BREVO_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

(Neither is required yet to run the site — they only matter once the
contact route is finished.)

## Why it's built this way

The design philosophy mirrors how I try to write code: start with the
fewest moving pieces that work, make the data flow explicit, and only add
a database, a queue, or a third-party service when there's an actual reason
to. The blog and contact form are both intentionally simple right now —
static data and a stubbed route — until there's a real need to make them
more than that.
