import { groq } from "next-sanity";

/**
 * Every query here filters to published + not-future-dated content.
 * Draft Mode bypasses this filter entirely via a different client
 * (perspective: "drafts") — see apps/web's draft-mode route.
 */
const PUBLISHED_FILTER = `_type == "post" && status == "published" && publishedAt <= now()`;

const POST_LIST_PROJECTION = `{
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  tags[]->{ _id, title, slug }
}`;

export const allPostsQuery = groq`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) ${POST_LIST_PROJECTION}
`;

export const latestPostsQuery = groq`
  *[${PUBLISHED_FILTER}] | order(publishedAt desc) [0...$count] ${POST_LIST_PROJECTION}
`;

export const postsByTagQuery = groq`
  *[${PUBLISHED_FILTER} && $tagSlug in tags[]->slug.current]
    | order(publishedAt desc) ${POST_LIST_PROJECTION}
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    status,
    tags[]->{ _id, title, slug },
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => { href }
      }
    },
    seo
  }
`;

/** Used by the Draft Mode route to resolve a slug to a document for redirect. */
export const postSlugAndStatusQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{ _id, status }
`;

/** All slugs + publishedAt, used by sitemap.ts. */
export const allPostSlugsQuery = groq`
  *[${PUBLISHED_FILTER}]{ "slug": slug.current, publishedAt }
`;

export const allTagsQuery = groq`
  *[_type == "tag"] | order(title asc){ _id, title, slug }
`;
