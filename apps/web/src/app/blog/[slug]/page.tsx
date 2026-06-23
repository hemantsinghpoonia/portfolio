import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { draftMode } from "next/headers";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { urlFor, estimateReadingTime } from "@repo/sanity-schema";
import { portableTextComponents } from "@/components/blog/portable-text-components";
import { DraftModeBanner } from "@/components/blog/draft-mode-banner";
import { getArticleSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";

const SITE_URL = "https://hemantsingh.dev";

type Params = { slug: string };

export const revalidate = 10800; // 3 hours

// This is to use only sanityClient, can never use draftClient
export async function generateStaticParams(): Promise<Params[]> {
  const postSlugs = await getAllPostSlugs();
  return postSlugs.map((postSlug) => ({ slug: postSlug.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const ogImageSource = post.seo?.ogImage || post.mainImage;
  const ogImageUrl = urlFor(ogImageSource)
    .width(1200)
    .height(630)
    .fit("crop")
    .auto("format")
    .url();
  const canonicalUrl = `/blog/${post.slug.current}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: post.seo?.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      images: [
        { url: ogImageUrl, width: 1200, height: 630, alt: post.mainImage.alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: "@hemantspoonia",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { isEnabled: isDraftMode } = await draftMode();
  const readingTime = estimateReadingTime(post.body);

  const articleSchema = getArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: urlFor(post.mainImage).width(1200).height(630).fit("crop").url(),
    slug: post.slug.current,
    publishedAt: post.publishedAt,
    readingTime: readingTime.isoDuration,
  });

  const coverImageUrl = urlFor(post.mainImage)
    .width(1600)
    .height(900)
    .fit("max")
    .auto("format")
    .url();

  return (
    <article className="mb-20">
      <JsonLd schema={articleSchema} />
      {isDraftMode && <DraftModeBanner />}

      <div className="max-w-3xl w-full mx-auto">
        <header className="mb-10">
          <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg text-foreground mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-label-sm text-muted-foreground uppercase tracking-wider">
            <span className="font-medium text-foreground">
              Hemant Singh Poonia
            </span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">•</span>
            <span>{readingTime.text}</span>
          </div>
        </header>

        <Image
          src={coverImageUrl}
          alt={post.mainImage.alt}
          width={1600}
          height={900}
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="mb-12 h-auto w-full rounded-lg border border-border-subtle"
        />

        <PortableText value={post.body} components={portableTextComponents} />
        <div className="mt-12 flex items-center justify-between border-t border-border-subtle pt-8">
          <p className="text-body-md text-muted-foreground">
            Thanks for reading. More posts on the{" "}
            <Link
              href="/blog"
              className="font-medium text-brand-strong underline underline-offset-2 hover:text-brand"
            >
              blog
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
