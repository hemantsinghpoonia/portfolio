import type { MetadataRoute } from "next";
import { allPostSlugsQuery } from "@repo/sanity-schema";
import { sanityClient } from "@repo/sanity-schema/client";
import { getAllPostSlugs } from "@/lib/posts";

const SITE_URL = "https://hemantsingh.dev";

type SlugEntry = { slug: string; publishedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();

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
    changeFrequency: "never",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
