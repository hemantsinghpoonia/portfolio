import Link from "next/link";

export function DraftModeBanner() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-outline-variant bg-inverse-surface px-4 py-2 text-label-sm text-inverse-foreground shadow-lg">
      Previewing draft content —{" "}
      <Link href="/api/draft-mode/disable" className="underline hover:text-brand-fixed-dim">
        exit preview
      </Link>
    </div>
  );
}
