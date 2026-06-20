export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown or plain paragraphs; render as needed
  date: string; // ISO format, e.g. "2024-05-15"
  readingTime: string;
  tags: string[];
  medium?: string; // optional: link to the synced Medium republish
};

// Source of truth for now. Swap this for a CMS/DB query later —
// every consumer (homepage teaser, /blog index, /blog/[slug]) goes
// through this one function so the swap is a single-file change.
const posts: BlogPost[] = [
  {
    slug: "mastering-nextjs-server-components",
    title: "Mastering Next.js Server Components",
    excerpt:
      "A deep dive into how server components work under the hood and how to leverage them for maximum performance.",
    content: "Full article content goes here...",
    date: "2024-05-15",
    readingTime: "5 min read",
    tags: ["Next.js", "React", "Performance"],
  },
  {
    slug: "resilient-rbac-better-auth",
    title: "Building a Resilient RBAC System with Better-Auth",
    excerpt:
      "Step-by-step guide to implementing robust Role-Based Access Control in modern full-stack applications.",
    content: "Full article content goes here...",
    date: "2024-04-28",
    readingTime: "7 min read",
    tags: ["Auth", "Backend", "Security"],
  },
  {
    slug: "scaling-fastify-realtime-workers",
    title: "Scaling Fastify for Real-time Workers",
    excerpt:
      "Techniques for optimizing Fastify to handle high-throughput real-time tasks without breaking a sweat.",
    content: "Full article content goes here...",
    date: "2024-04-10",
    readingTime: "6 min read",
    tags: ["Fastify", "Backend", "Performance"],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
