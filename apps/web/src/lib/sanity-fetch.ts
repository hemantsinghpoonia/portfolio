import { draftMode } from "next/headers";
import { sanityClient, getDraftModeClient } from "@repo/sanity-schema/client";
import type { QueryParams } from "next-sanity";

/**
 * Every blog page (index, [slug], sitemap) goes through this instead of
 * calling sanityClient.fetch directly. It checks Next.js's Draft Mode
 * state once and picks the right client — published+cached normally,
 * drafts+uncached when an editor is previewing via the Presentation tool.
 */
export async function sanityFetch<QueryResponse>(
  query: string,
  params: QueryParams = {},
  tags: string[] = [],
): Promise<QueryResponse> {
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return getDraftModeClient().fetch<QueryResponse>(query, params, {
      cache: "no-store",
    });
  }

  return sanityClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 60 * 60 * 3, // 3-hour fallback, see below
      tags,
    },
  });
}
