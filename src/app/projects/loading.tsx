const SKELETON = "motion-safe:animate-pulse bg-surface-2";

/** Route-level skeleton for /projects and /projects/[slug]. */
export default function ProjectsLoading() {
  return (
    <div className="shell pb-24 pt-28 sm:pb-32 sm:pt-36">
      <p role="status" className="sr-only">
        Loading projects…
      </p>

      <div className={`${SKELETON} h-3 w-32 rounded-full`} />
      <div
        className={`${SKELETON} mt-6 h-12 w-full max-w-2xl rounded-2xl`}
        aria-hidden
      />
      <div
        className={`${SKELETON} mt-5 h-6 w-full max-w-xl rounded-full`}
        aria-hidden
      />
      <div
        className={`${SKELETON} mt-3 h-6 w-full max-w-lg rounded-full`}
        aria-hidden
      />

      <div className="mt-14 flex flex-col gap-6" aria-hidden>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {["w-28", "w-36", "w-48"].map((width) => (
              <div key={width} className={`${SKELETON} h-11 ${width} rounded-full`} />
            ))}
          </div>
          <div className={`${SKELETON} h-11 w-full rounded-full lg:max-w-sm`} />
        </div>
        <div className="flex flex-wrap gap-2">
          {["w-24", "w-32", "w-28", "w-36", "w-24", "w-32"].map((width, i) => (
            <div key={i} className={`${SKELETON} h-11 ${width} rounded-full`} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="card overflow-hidden"
            aria-hidden
          >
            <div className={`${SKELETON} aspect-[16/10] w-full`} />
            <div className="space-y-3 p-5 sm:p-6">
              <div className={`${SKELETON} h-6 w-1/2 rounded-full`} />
              <div className={`${SKELETON} h-4 w-full rounded-full`} />
              <div className={`${SKELETON} h-4 w-4/5 rounded-full`} />
              <div className="flex gap-2 pt-3">
                <div className={`${SKELETON} h-6 w-20 rounded-full`} />
                <div className={`${SKELETON} h-6 w-24 rounded-full`} />
                <div className={`${SKELETON} h-6 w-16 rounded-full`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
