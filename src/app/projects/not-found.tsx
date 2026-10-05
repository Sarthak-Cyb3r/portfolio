import { ArrowLeft, Compass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

/** 404 for /projects and /projects/[slug]. */
export default function ProjectsNotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-28 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface-2 text-faint">
        <Compass size={26} aria-hidden />
      </span>

      <p className="kicker mt-6">Error 404</p>
      <h1 className="mt-4 max-w-2xl text-[clamp(2rem,1.2rem+3.6vw,3.25rem)]">
        This project isn&apos;t in the portfolio
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        The link may be old, or the project was never published. The rest of
        the work is still here.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/projects">
          <ArrowLeft size={16} aria-hidden />
          Back to all projects
        </Button>
        <Button href="/" variant="quiet">
          Go home
        </Button>
      </div>
    </div>
  );
}
