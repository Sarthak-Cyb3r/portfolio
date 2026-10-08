import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  DownloadSimple,
  GithubLogo,
  ShieldCheck,
  Sparkle,
  Tag,
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
            Target:{" "}
            {project.slug === "softify"
              ? "Android (API 26+) · iOS 15+ · Linux Desktop · Flutter"
              : project.slug === "ludo-vercel"
                ? "Linux · Android · Web"
                : "Linux / Docker · Web"}
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

        {project.liveUrl || project.repoUrl || (project.releaseNotes && project.releaseNotes.length > 0) ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <Button href={project.liveUrl} external>
                <ArrowUpRight size={16} aria-hidden />
                {project.slug === "softify" ? "v2.0.0 GitHub Release" : "Open live site"}
              </Button>
            ) : null}
            {project.releaseNotes && project.releaseNotes.length > 0 ? (
              <a
                href="#release-notes"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent-3/40 bg-accent-3/10 px-4 py-2 font-mono text-xs font-semibold text-accent-3 transition-colors hover:border-accent-3 hover:bg-accent-3/20"
              >
                <Sparkle size={14} weight="fill" />
                v{project.releaseNotes[0].version} Release Notes
              </a>
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
        {project.downloads.deb && project.slug !== "softify" && (
          <div className="mt-6">
            <CopySnippet
              command={`sudo dpkg -i ludo-with-friends-1.0.0-amd64.deb`}
              label="Linux Install"
            />
          </div>
        )}
        {project.slug === "softify" && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <CopySnippet
              command={`curl -fsSL https://raw.githubusercontent.com/Sarthak-Cyb3r/softify/main/install.sh | bash`}
              label="Linux Terminal Install"
            />
            {project.downloads.apk && (
              <CopySnippet
                command={`adb install Softify-v2.0.0-Universal.apk`}
                label="Android ADB Install"
              />
            )}
            {project.downloads.ipa && (
              <CopySnippet
                command={`sideloadly --install Softify-iOS-Universal.ipa`}
                label="iOS Sideloadly / AltStore"
              />
            )}
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
                <span className="text-text">
                  {project.slug === "softify" ? "Clean Architecture + Drift FTS5 + On-Device ML" : "Client-Server / Clean"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/50">
                <span className="text-faint">Test Status</span>
                <span className="text-ok">
                  {project.slug === "softify" ? "172/172 Passing Green (100%)" : "100% Passing Green"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/50">
                <span className="text-faint">Security</span>
                <span className="text-text">
                  {project.slug === "softify" ? "Client-Side Zero-Telemetry" : "scrypt / HTTPS / CSP"}
                </span>
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
      {/* Release Notes / Changelog                                      */}
      {/* ------------------------------------------------------------ */}
      {project.releaseNotes && project.releaseNotes.length > 0 ? (
        <Reveal className="mt-16 lg:mt-24">
          <section id="release-notes" aria-labelledby="release-notes-heading" className="scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="kicker mb-2">Changelog & Updates</p>
                <h2 id="release-notes-heading" className={sectionTitleClass}>
                  Release Notes
                </h2>
              </div>
              <span className="font-mono text-xs rounded-full border border-accent-3/40 bg-accent-3/10 px-3.5 py-1 text-accent-3 font-semibold">
                Latest: v{project.releaseNotes[0].version}
              </span>
            </div>

            <div className="mt-8 space-y-10">
              {project.releaseNotes.map((note) => (
                <div
                  key={note.version}
                  className="card p-6 sm:p-8 bg-surface border-line space-y-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line/60 pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag size={18} className="text-accent-3" />
                        <h3 className="text-xl sm:text-2xl font-bold text-text">
                          {note.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 font-mono text-xs text-muted">
                        Tagged as <span className="text-accent-2 font-semibold">{note.tag}</span> • Released {note.date}
                      </p>
                    </div>
                    {project.liveUrl ? (
                      <Button
                        href={project.liveUrl}
                        external
                        variant="outline"
                        className="text-xs px-3.5 py-1.5 min-h-9"
                      >
                        <ArrowUpRight size={14} aria-hidden />
                        GitHub Release
                      </Button>
                    ) : null}
                  </div>

                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {note.summary}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {note.changes.map((change) => (
                      <div
                        key={change.title}
                        className="rounded-xl border border-line bg-surface-2/60 p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-colors hover:border-line-strong"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <h4 className="font-semibold text-sm text-text leading-snug">
                              {change.title}
                            </h4>
                            {change.badge && (
                              <span className="shrink-0 font-mono text-[0.6875rem] px-2 py-0.5 rounded border border-line bg-surface text-accent-3 font-medium">
                                {change.badge}
                              </span>
                            )}
                          </div>

                          {change.problem && (
                            <div className="mb-2.5 rounded-lg border border-warn/25 bg-warn/5 p-3 text-xs text-muted">
                              <span className="font-mono font-semibold text-warn block mb-1">
                                Problem:
                              </span>
                              {change.problem}
                            </div>
                          )}

                          <div className="rounded-lg border border-accent-3/25 bg-accent-3/5 p-3 text-xs text-text">
                            <span className="font-mono font-semibold text-accent-3 block mb-1">
                              Solution:
                            </span>
                            {change.fix}
                          </div>
                        </div>

                        {change.details && change.details.length > 0 && (
                          <ul className="space-y-1.5 pt-2 border-t border-line/60">
                            {change.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-muted">
                                <span className="text-accent-2 font-bold mt-0.5 shrink-0">▸</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {note.assets && note.assets.length > 0 && (
                    <div className="pt-4 border-t border-line/60">
                      <p className="font-mono text-xs text-faint mb-3">Published Release Assets</p>
                      <div className="flex flex-wrap gap-3">
                        {note.assets.map((asset) => (
                          <a
                            key={asset.name}
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2 hover:border-accent-3 px-3.5 py-2 font-mono text-xs transition-colors"
                          >
                            <DownloadSimple size={15} className="text-accent-3" />
                            <span className="text-text font-medium">{asset.name}</span>
                            <span className="text-faint">({asset.size})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* ------------------------------------------------------------ */}
      {/* Downloads / next steps                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="mt-16 lg:mt-24">
        <ProjectDownloads project={project} />
      </div>
    </div>
  );
}
