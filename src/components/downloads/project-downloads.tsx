"use client";

import {
  ArrowUpRight,
  CheckCircle,
  CircleDashed,
  GithubLogo,
} from "@phosphor-icons/react";
import { useId } from "react";
import { PlatformTabs } from "@/components/downloads/platform-tabs";
import { StatusBadge } from "@/components/ui/bits";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Fallback target when a project has no published repository. */
const GITHUB_PROFILE = "https://github.com/Sarthak-Cyb3r";

type Availability = "ready" | "planned" | "missing";

const availabilityCopy: Record<
  Availability,
  { word: string; dot: string }
> = {
  ready: { word: "Ready", dot: "bg-ok" },
  planned: { word: "In development", dot: "bg-warn" },
  missing: { word: "Not available", dot: "bg-faint" },
};

/**
 * Data-driven branching — nothing about a specific project is hardcoded here:
 *   status !== "completed" → progress card (roadmap, no downloads)
 *   status === "completed" → download panel with a device selector
 */
export default function ProjectDownloads({ project }: { project: Project }) {
  if (project.status !== "completed") {
    return <WhatsBeingBuilt project={project} />;
  }
  return <DownloadPanel project={project} />;
}

function WhatsBeingBuilt({ project }: { project: Project }) {
  const headingId = useId();
  const repoHref = project.repoUrl?.trim() || GITHUB_PROFILE;

  return (
    <section
      aria-labelledby={headingId}
      className="card p-5 sm:p-7 lg:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <h2 id={headingId} className="text-xl sm:text-2xl">
          What&apos;s being built
        </h2>
      </div>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        {project.progressNote}
      </p>

      {project.roadmap.length === 0 ? (
        <p className="mt-5 rounded-xl border border-dashed border-line bg-surface-2 px-4 py-3.5 text-sm text-muted">
          No public roadmap yet — details land when there&apos;s something real
          to show.
        </p>
      ) : (
        <ul className="mt-5 grid gap-2.5">
          {project.roadmap.map((step, index) => {
            const { done, text } = parseRoadmapStep(step);
            return (
              <li
                key={`${index}-${step}`}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 shrink-0",
                    done ? "text-ok" : "text-faint",
                  )}
                >
                  {done ? (
                    <CheckCircle weight="fill" className="h-5 w-5" />
                  ) : (
                    <CircleDashed weight="regular" className="h-5 w-5" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    done
                      ? "text-muted line-through decoration-line-strong"
                      : "text-text",
                  )}
                >
                  <span className="sr-only">
                    {done ? "Done: " : "Next step: "}
                  </span>
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* Always a real link — repo when published, otherwise the profile. */}
        <Button href={repoHref} external variant="outline">
          <GithubLogo weight="fill" aria-hidden="true" className="h-4 w-4" />
          Follow progress on GitHub
          <ArrowUpRight weight="bold" aria-hidden="true" className="h-4 w-4" />
        </Button>

        {project.liveUrl ? (
          <Button href={project.liveUrl} external variant="ghost">
            Visit live site
            <ArrowUpRight weight="bold" aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </section>
  );
}

function DownloadPanel({ project }: { project: Project }) {
  const headingId = useId();

  const rows: Array<{ label: string; state: Availability }> = [
    { label: "Linux / Debian", state: project.downloads.deb ? "ready" : "missing" },
    { label: "Android", state: project.downloads.apk ? "ready" : "missing" },
    {
      label: "Windows",
      state: project.downloads.windows ? "ready" : "planned",
    },
  ];

  return (
    <section aria-labelledby={headingId} className="card p-5 sm:p-7 lg:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <h2 id={headingId} className="text-xl sm:text-2xl">
          Downloads
        </h2>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Official builds for {project.name} — pick your device below.
      </p>

      {/* Availability never relies on colour alone: dot + word, every time. */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {rows.map((row) => {
          const copy = availabilityCopy[row.state];
          return (
            <li key={row.label} className="flex items-center gap-2 text-xs">
              <span
                aria-hidden="true"
                className={cn("h-2 w-2 shrink-0 rounded-full", copy.dot)}
              />
              <span className="font-medium text-text">{row.label}</span>
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
              <span className="text-muted">{copy.word}</span>
            </li>
          );
        })}
      </ul>

      <PlatformTabs project={project} />
    </section>
  );
}

/**
 * Roadmap entries are plain strings, so a leading "✓" / "[x]" marker is the
 * only signal that a step is finished. Unmarked steps render as pending.
 */
const DONE_MARKER = /^\s*(?:\[x\]|✓|✔)\s*[—\-–]*\s*/i;

function parseRoadmapStep(step: string): { done: boolean; text: string } {
  const match = step.match(DONE_MARKER);
  if (match) return { done: true, text: step.slice(match[0].length) };
  return { done: false, text: step };
}
