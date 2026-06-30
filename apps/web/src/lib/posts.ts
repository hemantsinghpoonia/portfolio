import {
  allPostsQuery,
  latestPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
} from "@repo/sanity-schema";
import { estimateReadingTime, type Post } from "@repo/sanity-schema";
import { sanityFetch } from "@/lib/sanity-fetch";
import { sanityClient } from "@repo/sanity-schema/client";

export type PostList = Pick<
  Post,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "mainImage"
>[];
type SlugEntry = { slug: string; publishedAt: string };

//These two functions don't fetch the post body, as they are not needed for cards
export async function getAllPosts(): Promise<PostList> {
  return sanityFetch<PostList>(allPostsQuery, {}, ["blog-list"]);
}

export async function getLatestPosts(count: number): Promise<PostList> {
  return sanityFetch<PostList>(latestPostsQuery, { count }, ["blog-list"]);
}

//This is used to get Full Post data
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityFetch<Post | null>(postBySlugQuery, { slug }, [
    `blog-post:${slug}`,
  ]);
}

//This will be used to generate the static params and generateStaticParams doesn't allow us to use the draftMode() function, so we have to use this sanityClient.fetch instead of sanityFetch.
export async function getAllPostSlugs(): Promise<SlugEntry[]> {
  return sanityClient.fetch<SlugEntry[]>(
    allPostSlugsQuery,
    {},
    {
      next: { revalidate: false, tags: ["blog-list"] },
    },
  );
}
