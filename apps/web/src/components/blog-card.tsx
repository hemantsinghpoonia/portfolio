import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@repo/sanity-schema";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PostList } from "@/lib/posts";

type Post = PostList[number];

type BlogCardProps = {
  post: Post;
  sizes: string;
  density?: "compact" | "default";
  variant?: "vertical" | "horizontal";
  className?: string;
};

const IMAGE_WIDTH = 1280;
const IMAGE_HEIGHT = 720;

export function BlogCard({
  post,
  sizes,
  density = "default",
  variant = "vertical",
  className,
}: BlogCardProps) {
  const imageUrl = urlFor(post.mainImage)
    .width(IMAGE_WIDTH)
    .height(IMAGE_HEIGHT)
    .fit("crop")
    .auto("format")
    .url();

  const padding = density === "compact" ? "p-6" : "p-8";
  const isHorizontal = variant === "horizontal";

  return (
    <Card className={`group cursor-pointer h-full p-0 ${className ?? ""}`}>
      <Link
        href={`/blog/${post.slug.current}`}
        className={
          isHorizontal
            ? "flex h-full flex-col sm:flex-row"
            : "flex h-full flex-col"
        }
      >
        <Image
          src={imageUrl}
          alt={post.mainImage.alt}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes={sizes}
          className={
            isHorizontal
              ? "aspect-[16/9] w-full shrink-0 object-cover sm:w-90"
              : "aspect-[16/9] w-full shrink-0 object-cover"
          }
        />
        <div
          className={`flex min-w-0 flex-1 flex-col ${padding} ${
            isHorizontal ? "justify-center" : ""
          }`}
        >
          <div className="mb-4 text-label-sm text-muted-foreground">
            {formatDate(post.publishedAt)}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <h4 className="mb-4 line-clamp-2 font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-brand-strong">
                {post.title}
              </h4>
            </TooltipTrigger>
            {post.title.length > 60 && (
              <TooltipContent className="max-w-xs">{post.title}</TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <p
                className={`mb-6 line-clamp-3 text-body-md text-muted-foreground ${
                  isHorizontal ? "" : "flex-1"
                }`}
              >
                {post.excerpt}
              </p>
            </TooltipTrigger>
            {post.excerpt.length > 140 && (
              <TooltipContent className="max-w-sm">
                {post.excerpt}
              </TooltipContent>
            )}
          </Tooltip>

          <span
            className={`inline-flex items-center gap-2 text-label-sm uppercase tracking-wider text-brand-strong ${
              isHorizontal ? "" : "mt-auto"
            }`}
          >
            Read Article{" "}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </Card>
  );
}
