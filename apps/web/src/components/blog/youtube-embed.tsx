import type { Youtube } from "@repo/sanity-schema";

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function YoutubeEmbed({ value }: { value: Youtube }) {
  const videoId = extractYoutubeId(value.url);

  if (!videoId) {
    return (
      <p className="text-sm text-destructive">
        Couldn&apos;t parse this YouTube URL: {value.url}
      </p>
    );
  }

  return (
    <figure className="not-prose my-8">
      <div className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-surface-container-low pt-[56.25%]">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={value.caption || "YouTube video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
