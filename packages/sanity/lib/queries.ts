import { defineQuery } from "next-sanity";

/**
 * Every query here filters to published + not-future-dated content.
 * Draft Mode bypasses this filter entirely via a different client
 * (perspective: "drafts") — see apps/web's draft-mode route.
 */
const PUBLISHED_FILTER = `_type == "post" && publishedAt <= now()`;

const POST_LIST_PROJECTION = `{
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt
}`;

export const allPostsQuery = defineQuery(`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) ${POST_LIST_PROJECTION}
`);

export const latestPostsQuery = defineQuery(`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) [0...$count] ${POST_LIST_PROJECTION}
`);

export const postBySlugQuery = defineQuery(`
  *[${PUBLISHED_FILTER} && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => { href }
      }
    },
    seo
  }
`);

/** All slugs + publishedAt, used by sitemap.ts. */
export const allPostSlugsQuery = defineQuery(`
  *[${PUBLISHED_FILTER}]{ "slug": slug.current, publishedAt }
`);
