"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  projects as allProjects,
  technologies,
  type Project,
  type ProjectStatus,
} from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type StatusFilter = "all" | ProjectStatus;

const STATUS_TABS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "in-development", label: "Under Development" },
];

const SEARCH_DEBOUNCE_MS = 150;

const toSearchIndex = (project: Project) =>
  [
    project.name,
    project.tagline,
    project.description,
    project.stack.join(" "),
  ]
    .join(" ")
    .toLowerCase();

/**
 * Status tabs + debounced search + technology chips, and the results grid.
 *
 * Everything is derived from `@/data/projects`, so adding a project to that
 * file is all it takes for it to show up here — filters included.
 */
export function ProjectFilters() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [query]);

  const counts = useMemo(
    () => ({
      all: allProjects.length,
      completed: allProjects.filter((p) => p.status === "completed").length,
      "in-development": allProjects.filter(
        (p) => p.status === "in-development",
      ).length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    const needle = debouncedQuery;
    return allProjects.filter((project) => {
      if (status !== "all" && project.status !== status) return false;
      if (
        activeTech.length > 0 &&
        !project.stack.some((tech) => activeTech.includes(tech))
      ) {
        return false;
      }
      if (needle && !toSearchIndex(project).includes(needle)) return false;
      return true;
    });
  }, [status, activeTech, debouncedQuery]);

  const hasFilters =
    status !== "all" || activeTech.length > 0 || query.trim().length > 0;

  const clearFilters = () => {
    setStatus("all");
    setActiveTech([]);
    setQuery("");
  };

  const toggleTech = (tech: string) =>
    setActiveTech((current) =>
      current.includes(tech)
        ? current.filter((item) => item !== tech)
        : [...current, tech],
    );

  return (
    <div className="flex flex-col gap-8">
      {/* ---------------------------------------------------------- */}
      {/* Controls                                                    */}
      {/* ---------------------------------------------------------- */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by status"
            className="flex flex-wrap gap-2"
          >
            {STATUS_TABS.map((tab) => {
              const selected = status === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatus(tab.id)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200",
                    selected
                      ? "border-transparent bg-text text-bg"
                      : "border-line text-muted hover:border-line-strong hover:text-text",
                  )}
                >
                  {tab.label}
                  <span className="tabular font-mono text-[0.7rem] opacity-70">
                    {counts[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-sm">
            <label htmlFor="project-search" className="sr-only">
              Search projects by name, description or technology
            </label>
            <MagnifyingGlass
              size={16}
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects…"
              autoComplete="off"
              spellCheck={false}
              className="min-h-11 w-full rounded-full border border-line bg-surface pl-11 pr-12 text-sm text-text transition-colors duration-200 placeholder:text-faint hover:border-line-strong"
            />
          </div>
        </div>

        {technologies.length > 0 ? (
          <div role="group" aria-label="Filter projects by technology">
            <p className="kicker mb-3">Built with</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const selected = activeTech.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTech(tech)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-4 font-mono text-[0.7rem] tracking-[0.04em] transition-colors duration-200",
                      selected
                        ? "border-transparent bg-accent-2 text-[#05060A]"
                        : "border-line bg-surface-2 text-muted hover:border-line-strong hover:text-text",
                    )}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <p
          role="status"
          aria-live="polite"
          className="tabular font-mono text-[0.7rem] uppercase tracking-[0.18em] text-faint"
        >
          Showing {filtered.length} of {allProjects.length} projects
          {hasFilters ? " — filters active" : ""}
        </p>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Results                                                     */}
      {/* ---------------------------------------------------------- */}
      {filtered.length > 0 ? (
        <Stagger className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {filtered.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="card flex flex-col items-center gap-5 px-6 py-14 text-center">
          <MagnifyingGlass
            size={28}
            aria-hidden
            className="text-faint"
          />
          <div className="max-w-sm">
            <p className="font-display text-xl text-text">
              Nothing matches those filters
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No project matches that search and those tags right now. Clear
              everything to see all {allProjects.length} projects again.
            </p>
          </div>
          <Button variant="quiet" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
