import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full mt-32">
      <Separator className="mb-12" />
      <div className="pb-12 flex flex-col md:flex-row justify-between items-center gap-layout-gutter text-muted-foreground">
        {/* <div className="font-heading text-headline-md text-foreground">HS</div> */}
        <div className="text-label-sm text-center lg:text-body-md">
          © {new Date().getFullYear()} Hemant Singh Poonia. Built with technical
          precision.
        </div>
        <div className="flex gap-6 text-label-sm lg:text-body-md">
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://linkedin.com/in/hemantsinghpoonia"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://github.com/hemantsinghpoonia"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="https://x.com/hemantspoonia"
            target="_blank"
            rel="noopener noreferrer"
          >
            𝕏
          </a>
          <a
            className="hover:text-brand-strong transition-colors"
            href="mailto:hello@hemantsingh.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
