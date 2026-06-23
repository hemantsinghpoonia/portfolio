import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogNotFound() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center text-center mb-32">
      <p className="text-label-sm text-brand-strong uppercase tracking-wider mb-4">404</p>
      <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg text-foreground mb-6">
        This post doesn&apos;t exist
      </h1>
      <p className="text-body-lg text-muted-foreground mb-10 max-w-md">
        It may have been unpublished, renamed, or the link is just wrong. Either way, here&apos;s
        the rest of the blog.
      </p>
      <Button asChild>
        <Link href="/blog">
          Back to all articles <ArrowRight size={16} />
        </Link>
      </Button>
    </section>
  );
}
