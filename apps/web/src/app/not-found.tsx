import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-label-sm text-brand-strong uppercase tracking-wider mb-4">
        404
      </p>
      <h1 className="font-heading text-headline-lg-mobile md:text-headline-lg text-foreground mb-6">
        This page doesn&apos;t exist
      </h1>
      <p className="text-body-lg text-muted-foreground mb-10 max-w-md">
        The link might be broken, or the page may have moved. Let&apos;s get you
        back on track.
      </p>
      <Button asChild>
        <Link href="/">
          Back to home <ArrowRight size={16} />
        </Link>
      </Button>
    </section>
  );
}
