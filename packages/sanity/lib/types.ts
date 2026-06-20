export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export type MainImage = SanityImage & { alt: string };

export type Tag = {
  _id: string;
  title: string;
  slug: { current: string };
};

export type LinkAnnotation = {
  _type: "link";
  href: string;
};

export type CodeBlock = {
  _type: "code";
  _key: string;
  language?: string;
  filename?: string;
  code: string;
  highlightedLines?: number[];
};

export type YoutubeBlock = {
  _type: "youtube";
  _key: string;
  url: string;
  caption?: string;
};

export type CalloutBlock = {
  _type: "callout";
  _key: string;
  tone: "note" | "tip" | "warning";
  text: string;
};

export type BodyImageBlock = SanityImage & {
  _type: "bodyImage";
  _key: string;
  alt: string;
  caption?: string;
  layout: "contained" | "wide" | "full";
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  children: { _type: "span"; text: string; marks?: string[] }[];
  markDefs?: LinkAnnotation[];
};

export type BodyContent = (
  | PortableTextBlock
  | CodeBlock
  | YoutubeBlock
  | CalloutBlock
  | BodyImageBlock
)[];

export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: MainImage;
  tags?: Tag[];
  publishedAt: string;
  status: "draft" | "published";
  body: BodyContent;
  seo?: SeoFields;
};

/** Lighter shape for listing pages (homepage teaser, /blog index) — no body. */
export type PostListItem = Pick<
  Post,
  "_id" | "title" | "slug" | "excerpt" | "mainImage" | "tags" | "publishedAt"
>;
