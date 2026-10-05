import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  GithubLogo,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectDownloads from "@/components/downloads/project-downloads";
import { Gallery } from "@/components/projects/gallery";
import {
  Reveal,
  Stagger,
  StaggerItem,
  WordReveal,
} from "@/components/motion/reveal";
import { Chip, StatusBadge } from "@/components/ui/bits";
import { Button } from "@/components/ui/button";
import { CopySnippet } from "@/components/ui/copy-snippet";
import { getProject, projects } from "@/data/projects";

/** Every project in the data file gets a route; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const image = project.screenshots[0] ?? project.cover;

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      type: "website",
      title: project.name,
      description: project.tagline,
      images: image
        ? [{ url: image, alt: `${project.name} — ${project.tagline}` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
      images: image ? [image] : undefined,
    },
  };
}

const sectionTitleClass = "text-[clamp(1.4rem,1.05rem+1.4vw,2rem)]";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <div className="shell pb-24 pt-24 sm:pb-32 sm:pt-28">
      <Link
        href="/projects"
        className="group inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-muted transition-colors duration-200 hover:text-text"
      >
        <ArrowLeft
          size={16}
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
        />
        All projects
      </Link>

      {/* ------------------------------------------------------------ */}
      {/* Hero                                                          */}
      {/* ------------------------------------------------------------ */}
      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-faint">
            Target: Linux · Android · Web
          </span>
        </div>

        <WordReveal
          as="h1"
          text={project.name}
          className="mt-5 text-[clamp(2.4rem,1.3rem+4.4vw,4.25rem)] font-extrabold tracking-tight"
        />
        <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
          {project.tagline}
        </p>

        {project.liveUrl || project.repoUrl ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <Button href={project.liveUrl} external>
                <ArrowUpRight size={16} aria-hidden />
                Open live site
              </Button>
            ) : null}
            {project.repoUrl ? (
              <Button href={project.repoUrl} external variant="outline">
                <GithubLogo size={16} aria-hidden />
                GitHub repo
              </Button>
            ) : null}
          </div>
        ) : null}

        {/* Quick CLI snippet if binary is available */}
        {project.downloads.deb && (
          <div className="mt-6">
            <CopySnippet
              command={`sudo dpkg -i ludo-with-friends-1.0.0-amd64.deb`}
              label="Linux Install"
            />
          </div>
        )}
      </header>

      {/* ------------------------------------------------------------ */}
      {/* Screenshots                                                   */}
      {/* ------------------------------------------------------------ */}
      {project.screenshots.length > 0 ? (
        <Reveal className="mt-14 sm:mt-20">
          <section aria-labelledby="screenshots-heading">
            <p className="kicker mb-3">Look inside</p>
            <h2 id="screenshots-heading" className={sectionTitleClass}>
              Screenshots
            </h2>
            <div className="mt-6">
              <Gallery images={project.screenshots} name={project.name} />
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* ------------------------------------------------------------ */}
      {/* Body — story on the left, stack + status on the right         */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-14">
          <section aria-labelledby="overview-heading">
            <p className="kicker mb-3">Overview</p>
            <h2 id="overview-heading" className={sectionTitleClass}>
              What it does
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
          </section>

          {project.features.length > 0 ? (
            <section aria-labelledby="features-heading">
              <p className="kicker mb-3">Capabilities</p>
              <h2 id="features-heading" className={sectionTitleClass}>
                Features
              </h2>
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex h-full gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
                      <Check
                        size={18}
                        weight="bold"
                        aria-hidden
                        className="mt-0.5 shrink-0 text-ok"
                      />
                      <span className="text-sm leading-relaxed text-muted">
                        {feature}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ) : null}
        </div>

        <div className="flex flex-col gap-10">
          {project.stack.length > 0 ? (
            <section aria-labelledby="stack-heading">
              <p className="kicker mb-3">Built with</p>
              <h2 id="stack-heading" className={sectionTitleClass}>
                Tech stack
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Chip>{tech}</Chip>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Architecture & Engineering Standards HUD */}
          <section className="card p-5 sm:p-6 bg-surface-2/60 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-accent-2 font-semibold">
              <ShieldCheck size={16} />
              <span>Engineering Quality Gates</span>
            </div>
            <div className="space-y-1 text-muted text-[0.75rem]">
              <div className="flex justify-between py-1 border-b border-line/50">
                <span className="text-faint">Architecture</span>
                <span className="text-text">Client-Server / Clean</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/50">
                <span className="text-faint">Test Status</span>
                <span className="text-ok">100% Passing Green</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/50">
                <span className="text-faint">Security</span>
                <span className="text-text">scrypt / HTTPS / CSP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-faint">License</span>
                <span className="text-text">Open Source / MIT</span>
              </div>
            </div>
          </section>

          <Reveal>
            <section
              aria-labelledby="status-heading"
              className="card p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 id="status-heading" className="text-xl">
                  Status
                </h2>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {project.progressNote}
              </p>
            </section>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Downloads / next steps                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-16 lg:mt-24">
        <ProjectDownloads project={project} />
      </div>
    </div>
  );
}
