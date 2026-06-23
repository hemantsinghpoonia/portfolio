export default function BlogIndexLoading() {
  return (
    <section className="mb-32 max-w-3xl w-full mx-auto">
      <div className="section-heading">
        <div className="h-10 w-32 animate-pulse rounded bg-surface-container-low md:h-12 md:w-40" />
      </div>
      <div className="mb-16 h-6 w-full max-w-2xl animate-pulse rounded bg-surface-container-low" />

      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border border-border-subtle sm:flex-row"
          >
            <div className="aspect-[16/9] w-full shrink-0 animate-pulse bg-surface-container-low sm:aspect-[3/2] sm:w-60" />
            <div className="flex flex-1 flex-col justify-center gap-4 p-8">
              <div className="h-3 w-1/4 animate-pulse rounded bg-surface-container-low" />
              <div className="h-5 w-5/6 animate-pulse rounded bg-surface-container-low" />
              <div className="h-4 w-full animate-pulse rounded bg-surface-container-low" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-surface-container-low" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
