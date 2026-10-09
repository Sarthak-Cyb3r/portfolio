"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  projects as allProjects,
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

export function ProjectFilters() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

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
      if (needle && !toSearchIndex(project).includes(needle)) return false;
      return true;
    });
  }, [status, debouncedQuery]);

  const hasFilters = status !== "all" || query.trim().length > 0;

  const clearFilters = () => {
    setStatus("all");
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
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
                  "inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border px-4 text-xs font-medium transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent outline-none",
                  selected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-card text-muted-fg hover:text-fg hover:border-slate-400",
                )}
              >
                <span>{tab.label}</span>
                <span className="tabular font-mono text-[11px] opacity-80">
                  {counts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-muted-fg pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full min-h-[44px] rounded-[10px] border border-border bg-card pl-10 pr-4 text-xs text-fg placeholder:text-muted-fg outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-mono text-muted-fg">
        Showing {filtered.length} of {allProjects.length} projects
        {hasFilters && " (filters active)"}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-[14px] border border-border bg-card p-12 text-center space-y-4">
          <p className="text-base font-semibold text-fg">No projects found</p>
          <p className="text-xs text-muted-fg max-w-sm mx-auto">
            Try resetting your search query or status filter to see all projects.
          </p>
          <Button variant="secondary" onClick={clearFilters} size="sm">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
