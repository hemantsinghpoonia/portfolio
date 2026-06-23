import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { BlogCard } from "@/components/blog-card";

export const revalidate = 10800; // 3 hours

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on full-stack engineering — Next.js, backend architecture, and the daily problems I run into while building production apps.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Hemant Singh",
    description:
      "Notes on full-stack engineering — Next.js, backend architecture, and the daily problems I run into while building production apps.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="mb-32 max-w-3xl w-full mx-auto">
      <div className="section-heading">
        <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg text-foreground">
          Blog
        </h1>
      </div>
      <p className="text-body-lg text-muted-foreground mb-16 max-w-2xl">
        Notes from the daily grind of full-stack engineering — what broke, what
        I learned, and how I fixed it.
      </p>
      {posts.length === 0 ? (
        <p className="text-body-md text-muted-foreground">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post._id}
              post={post}
              variant="horizontal"
              sizes="(min-width: 640px) 240px, 100vw"
            />
          ))}
        </div>
      )}
    </section>
  );
}
