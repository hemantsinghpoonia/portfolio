// Schema
export { schemaTypes } from "./schema";
export { postType } from "./schema/post";
export { tagType } from "./schema/tag";
export { seoType } from "./schema/seo";
export { youtubeType } from "./schema/youtube";
export { calloutType } from "./schema/callout";
export { bodyImageType } from "./schema/bodyImage";

// Client + image helper
export { sanityClient, getDraftModeClient, apiVersion, projectId, dataset } from "./lib/client";
export { urlFor } from "./lib/image";

// Queries
export {
  allPostsQuery,
  latestPostsQuery,
  postsByTagQuery,
  postBySlugQuery,
  postSlugAndStatusQuery,
  allPostSlugsQuery,
  allTagsQuery,
} from "./lib/queries";

// Reading time
export { estimateReadingTime } from "./lib/readingTime";

// Types
export type {
  Post,
  PostListItem,
  Tag,
  SeoFields,
  BodyContent,
  PortableTextBlock,
  CodeBlock,
  YoutubeBlock,
  CalloutBlock,
  BodyImageBlock,
  LinkAnnotation,
  SanityImage,
  MainImage,
} from "./lib/types";

