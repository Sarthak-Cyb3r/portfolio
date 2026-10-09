import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { DeviceFrame } from "@/components/ui/device-frame";
import { DownloadButton } from "@/components/ui/download-button";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — Engineering Case Study`,
    description: project.outcome,
    openGraph: {
      title: `${project.name} — Engineering Case Study`,
      description: project.outcome,
      images: project.screenshots[0] ? [{ url: project.screenshots[0] }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const hasDownloads = Object.keys(project.downloads).length > 0;
  const isMobile = project.slug === "softify";

  return (
    <div className="py-12 sm:py-20 max-w-[1120px] mx-auto px-4 sm:px-6">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-fg hover:text-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to selected work</span>
        </Link>
      </div>

      {/* Main Grid: Sticky Mini-nav on Desktop + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sticky Mini-Nav on Desktop */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-fg">
            On this page
          </div>
          <nav className="flex flex-col gap-2 text-sm">
            <a
              href="#overview"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              Overview
            </a>
            <a
              href="#screens"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              Interface & Screens
            </a>
            <a
              href="#architecture"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              System Architecture
            </a>
            <a
              href="#decisions"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              Key Decisions
            </a>
            <a
              href="#challenges"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              Challenges & Learnings
            </a>
            <a
              href="#tech"
              className="text-muted-fg hover:text-accent transition-colors"
            >
              Technical Stack
            </a>
            {project.releaseNotes && (
              <a
                href="#releases"
                className="text-muted-fg hover:text-accent transition-colors"
              >
                Release Notes
              </a>
            )}
            {hasDownloads && (
              <a
                href="#downloads"
                className="text-muted-fg hover:text-accent transition-colors"
              >
                Downloads
              </a>
            )}
          </nav>

          {/* Quick links */}
          <div className="pt-6 border-t border-border flex flex-col gap-2.5">
            {project.liveUrl && (
              <Button href={project.liveUrl} external variant="primary" size="sm">
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} external variant="secondary" size="sm">
                <span>Source Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </aside>

        {/* Content Column */}
        <main className="lg:col-span-9 space-y-20">
          {/* Header */}
          <header className="space-y-4 border-b border-border pb-10">
            <div className="flex flex-wrap items-center gap-3">
              <Chip
                variant={project.status === "completed" ? "success" : "default"}
                size="md"
              >
                {project.statusLabel}
              </Chip>
              <span className="text-xs text-muted-fg font-mono">
                {project.platforms.join(" · ")}
              </span>
              {project.testsPassing && (
                <span className="text-xs text-emerald-600 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {project.testsPassing} tests passing
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-fg leading-[1.1]">
              {project.name}
            </h1>

            <p className="text-xl text-muted-fg leading-relaxed max-w-[65ch]">
              {project.tagline}
            </p>
          </header>

          {/* 1. Overview: Problem + Outcome */}
          <section id="overview" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border border-border space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                  The Problem
                </span>
                <p className="text-sm text-muted-fg leading-relaxed">
                  {project.problem}
                </p>
              </Card>

              <Card className="p-6 bg-card border border-border space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  The Solution & Outcome
                </span>
                <p className="text-sm text-muted-fg leading-relaxed">
                  {project.solution}
                </p>
              </Card>
            </div>

            <p className="text-base text-muted-fg leading-relaxed pt-2">
              {project.description}
            </p>
          </section>

          {/* 2. Screenshots in Device Frames */}
          <section id="screens" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">
              Interface & Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.screenshots.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-[14px] bg-muted/30 border border-border p-4 flex items-center justify-center overflow-hidden"
                >
                  {isMobile ? (
                    <div className="max-w-[240px] w-full">
                      <DeviceFrame
                        type="mobile"
                        src={img}
                        alt={`${project.name} screen ${idx + 1}`}
                      />
                    </div>
                  ) : (
                    <DeviceFrame
                      type="desktop"
                      src={img}
                      alt={`${project.name} screen ${idx + 1}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 3. Architecture SVG Diagram */}
          <section id="architecture" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">
              System Architecture
            </h2>
            <p className="text-sm text-muted-fg leading-relaxed">
              {project.architectureOverview}
            </p>
            <ArchitectureDiagram slug={project.slug} />
          </section>

          {/* 4. Key Decisions (3-4) */}
          <section id="decisions" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">Key Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyDecisions.map((dec, i) => (
                <Card
                  key={i}
                  className="p-6 bg-card border border-border flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center font-mono text-[11px] font-semibold text-fg">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-sm text-fg">
                      {dec.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-fg leading-relaxed pl-7">
                    {dec.rationale}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. Challenges & Learnings */}
          <section id="challenges" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">
              Challenges & What I Learned
            </h2>
            <ul className="space-y-3">
              {project.challenges.map((ch, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-fg leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Technical Stack */}
          <section id="tech" className="space-y-6">
            <h2 className="text-2xl font-semibold text-fg">Technical Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <Chip key={t} variant="outline" size="md">
                  {t}
                </Chip>
              ))}
            </div>
          </section>

          {/* 7. Release Notes */}
          {project.releaseNotes && project.releaseNotes.length > 0 && (
            <section id="releases" className="space-y-6">
              <h2 className="text-2xl font-semibold text-fg">Release Notes</h2>
              <div className="space-y-6">
                {project.releaseNotes.map((note) => (
                  <Card
                    key={note.version}
                    className="p-6 bg-card border border-border space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-fg">{note.title}</span>
                        <span className="text-xs font-mono text-muted-fg">
                          ({note.date})
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-fg">{note.summary}</p>
                    <div className="space-y-2">
                      {note.changes.map((c, i) => (
                        <div key={i} className="text-xs text-muted-fg">
                          <span className="font-semibold text-fg">
                            {c.title}:
                          </span>{" "}
                          {c.fix}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* 8. Downloads */}
          {hasDownloads && (
            <section id="downloads" className="space-y-6 pt-6 border-t border-border">
              <h2 className="text-2xl font-semibold text-fg">
                Install & Run
              </h2>
              <p className="text-sm text-muted-fg">
                Pre-built standalone binaries compiled directly from repository sources.
              </p>
              <DownloadButton
                downloads={project.downloads}
                projectName={project.name}
              />
            </section>
          )}

          {/* Prev / Next Project Navigation */}
          <nav
            aria-label="Previous and Next Project Navigation"
            className="pt-12 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-4 rounded-[14px] border border-border bg-card hover:border-slate-400/80 transition-colors flex items-center justify-between group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-fg">Previous</span>
                <span className="font-semibold text-fg group-hover:text-accent transition-colors">
                  {prevProject.name}
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-muted-fg group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-4 rounded-[14px] border border-border bg-card hover:border-slate-400/80 transition-colors flex items-center justify-between text-right group"
            >
              <ArrowRight className="w-4 h-4 text-muted-fg group-hover:translate-x-1 transition-transform order-last" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-fg">Next</span>
                <span className="font-semibold text-fg group-hover:text-accent transition-colors">
                  {nextProject.name}
                </span>
              </div>
            </Link>
          </nav>
        </main>
      </div>

      {/* Sticky Bottom Floating Download Bar */}
      {hasDownloads && (
        <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 rounded-full border border-border bg-card/90 dark:bg-card/85 backdrop-blur-xl px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-fg">
              <span>{project.name}</span>
              <span className="text-[10px] font-mono text-muted-fg px-1.5 py-0.5 rounded bg-muted">
                {(
                  project.downloads.apk?.version ||
                  project.downloads.deb?.version ||
                  project.downloads.ipa?.version ||
                  project.downloads.tar?.version ||
                  project.releaseNotes?.[0]?.version ||
                  "1.0"
                ).replace(/^v?/, "v")}
              </span>
            </div>
            <div className="relative group">
              <Button href="#downloads" variant="primary" size="sm" shimmer>
                <span>Download Release</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
