import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full mt-32">
      <Separator className="mb-12" />
      <div className="pb-12 flex flex-col md:flex-row justify-between items-center gap-layout-gutter text-muted-foreground">
        <div className="font-heading text-headline-md text-foreground">HS</div>
        <div className="text-body-md">
          © {new Date().getFullYear()} Hemant Singh. Built with technical
          precision.
        </div>
        <div className="flex gap-6 text-body-md">
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://linkedin.com/in/hemantsinghpoonia"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://github.com/hemantsinghpoonia"
          >
            GitHub
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://x.com/hemantspoonia"
          >
            𝕏
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="mailto:hello@hemantsingh.dev"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
