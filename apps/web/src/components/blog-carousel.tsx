"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

export function BlogCarousel({ posts }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;

    const syncActive = () => {
      const center = container.scrollLeft + container.clientWidth / 2;

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - center);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncActive);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    syncActive();

    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [posts.length]);

  const scrollToIndex = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIndex(index);
  };

  return (
    <div className="md:hidden">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post, index) => (
          <Card
            key={post.slug}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="group shrink-0 basis-[74%] sm:basis-[58%] max-w-[19.5rem] snap-center p-6"
          >
            <div className="text-xs text-muted-foreground text-label-sm mb-4">
              {formatDate(post.date)} • {post.readingTime}
            </div>
            <h4 className="font-heading text-lg text-foreground font-semibold mb-4 group-hover:text-brand-strong transition-colors">
              {post.title}
            </h4>
            <p className="text-body-md text-muted-foreground mb-6 line-clamp-3">
              {post.excerpt}
            </p>
            <Button
              asChild
              variant="ghost"
              className="px-0 h-auto text-brand-strong hover:bg-transparent hover:text-brand-strong"
            >
              <Link href={`/blog/${post.slug}`}>
                Read Article <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {posts.map((post, index) => (
          <button
            key={post.slug}
            type="button"
            aria-label={`View article ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-200",
              activeIndex === index ? "w-7 bg-brand-strong" : "w-2.5 bg-outline-variant"
            )}
          />
        ))}
      </div>
    </div>
  );
}
