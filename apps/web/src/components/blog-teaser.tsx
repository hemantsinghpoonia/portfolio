import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestPosts } from "@/lib/posts";
import { BlogCarousel } from "@/components/blog-carousel";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./blog-card";

export async function BlogTeaser() {
  const posts = await getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="mb-32">
      <div className="flex justify-between items-end mb-12">
        <div className="section-heading mb-0">
          <h3 className="font-heading text-headline-md text-foreground">
            Technical Learnings
          </h3>
        </div>
        <Button
          asChild
          variant="ghost"
          className="hidden md:inline-flex px-0 h-auto"
        >
          <Link href="/blog">
            View All Articles <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <BlogCarousel posts={posts} />

      <div className="hidden md:grid lg:hidden grid-cols-2 gap-layout-bento-gap">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            density="compact"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-layout-bento-gap">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            post={post}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ))}
      </div>

      <Button
        asChild
        variant="ghost"
        className="md:hidden mt-8 w-full justify-center px-0 h-auto"
      >
        <Link href="/blog">
          View All Articles <ArrowRight size={16} />
        </Link>
      </Button>
    </section>
  );
}
