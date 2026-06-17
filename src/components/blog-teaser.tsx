import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestPosts, formatDate } from "@/lib/posts";
import { BlogCarousel } from "@/components/blog-carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogTeaser() {
  const posts = getLatestPosts(3);

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
          <Card key={post.slug} className="group cursor-pointer p-6">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="text-xs text-muted-foreground text-label-sm mb-4">
                {formatDate(post.date)} • {post.readingTime}
              </div>
              <h4 className="font-heading text-lg text-foreground font-semibold mb-4 group-hover:text-brand-strong transition-colors">
                {post.title}
              </h4>
              <p className="text-body-md text-muted-foreground mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-brand-strong text-label-sm uppercase tracking-wider">
                Read Article{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Card>
        ))}
      </div>

      <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-layout-bento-gap">
        {posts.map((post) => (
          <Card key={post.slug} className="group cursor-pointer p-8">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="text-sm text-muted-foreground text-label-sm mb-4">
                {formatDate(post.date)} • {post.readingTime}
              </div>
              <h4 className="font-heading text-lg text-foreground font-semibold mb-4 group-hover:text-brand-strong transition-colors">
                {post.title}
              </h4>
              <p className="text-body-md text-muted-foreground mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-brand-strong text-label-sm uppercase tracking-wider">
                Read Article{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Card>
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
