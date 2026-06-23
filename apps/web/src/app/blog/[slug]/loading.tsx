export default function BlogPostLoading() {
  return (
    <article className="mb-20">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <div className="mb-6 flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-surface-container-low" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-surface-container-low" />
          </div>
          <div className="mb-6 h-10 w-full max-w-2xl animate-pulse rounded bg-surface-container-low md:h-12" />
          <div className="h-4 w-48 animate-pulse rounded bg-surface-container-low" />
        </header>

        <div className="mb-12 aspect-[16/9] w-full animate-pulse rounded-lg bg-surface-container-low" />

        <div className="max-w-3xl space-y-4 mx-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded bg-surface-container-low"
              style={{ width: `${85 - (index % 3) * 15}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
