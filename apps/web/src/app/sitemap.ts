import type { MetadataRoute } from "next";
import { allPostSlugsQuery } from "@repo/sanity-schema";
import { sanityClient } from "@repo/sanity-schema/client";

const SITE_URL = "https://hemantsingh.dev";

type SlugEntry = { slug: string; publishedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityClient.fetch<SlugEntry[]>(
    allPostSlugsQuery,
    {},
    {
      next: { revalidate: 60 * 60 * 3, tags: ["blog-content"] },
    },
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
