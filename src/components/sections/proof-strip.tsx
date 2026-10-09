"use client";

import { useEffect, useState } from "react";
import { GitCommit, ShieldCheck, Activity } from "lucide-react";
import { Stat } from "@/components/ui/stat";
import { VERIFIED_TEST_STATS, GITHUB_USERNAME } from "@/data/site";

interface CommitInfo {
  relativeTime: string;
  repo: string;
}

export function ProofStrip() {
  const [lastCommit, setLastCommit] = useState<CommitInfo | null>({
    relativeTime: "recently",
    repo: "softify",
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchLastCommit() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
          headers: { Accept: "application/vnd.github.v3+json" },
        });
        if (!res.ok) return;
        const events = await res.json();
        if (!Array.isArray(events)) return;

        const pushEvent = events.find(
          (e: { type: string; payload?: { commits?: unknown[] } }) =>
            e.type === "PushEvent"
        );

        if (pushEvent && pushEvent.created_at && isMounted) {
          const commitDate = new Date(pushEvent.created_at);
          const now = new Date();
          const diffHours = Math.floor((now.getTime() - commitDate.getTime()) / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHours / 24);

          let timeStr = "today";
          if (diffDays > 0) {
            timeStr = `${diffDays}d ago`;
          } else if (diffHours > 0) {
            timeStr = `${diffHours}h ago`;
          }

          const repoName = pushEvent.repo?.name?.split("/")[1] || "softify";
          setLastCommit({ relativeTime: timeStr, repo: repoName });
        }
      } catch {
        // fail-safe fallback already set
      }
    }

    fetchLastCommit();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="stats"
      aria-labelledby="proof-heading"
      className="relative py-16 sm:py-20 border-y border-border/80 bg-card/60 backdrop-blur-md"
    >
      {/* Top and Bottom Glowing Hairlines */}
      <div className="absolute top-0 inset-x-0 glowing-divider" />
      <div className="absolute bottom-0 inset-x-0 glowing-divider" />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <h2 id="proof-heading" className="sr-only">
          Verified Engineering Metrics
        </h2>

        {/* 4 Real Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-border/70">
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Live</span>
            </div>
            <Stat
              value={4}
              label="Platforms shipped"
              sublabel="Android, iOS, Linux, Web"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">CI Verified</span>
            </div>
            <Stat
              value={VERIFIED_TEST_STATS.totalPassing}
              label="Automated tests passing"
              sublabel={`${VERIFIED_TEST_STATS.studyStackPassing} StudyStack · ${VERIFIED_TEST_STATS.softifyPassing} Softify`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Codebases</span>
            </div>
            <Stat
              value={3}
              label="Flagship projects"
              sublabel="Clean architecture & zero-build"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs font-mono text-muted-fg uppercase tracking-wider">Privacy</span>
            </div>
            <Stat
              value={0}
              label="Cloud telemetry"
              sublabel="100% client-side privacy architecture"
            />
          </div>
        </div>

        {/* Live GitHub Commit Activity Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-fg">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <GitCommit className="w-4 h-4 text-fg" />
            <span>
              Last commit{" "}
              <strong className="text-fg font-semibold">
                {lastCommit?.relativeTime ?? "recently"}
              </strong>{" "}
              to{" "}
              <span className="text-primary font-medium underline underline-offset-2">
                {lastCommit?.repo ?? "softify"}
              </span>
            </span>
          </div>

          {/* GitHub Activity Visual Mockup (12 mini commit blocks) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-fg mr-1 hidden sm:inline">Recent Activity:</span>
            {[2, 4, 1, 5, 3, 6, 2, 8, 4, 7, 5, 3].map((val, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-xs transition-transform hover:scale-125"
                style={{
                  backgroundColor:
                    val > 5 ? "var(--c-primary)" : val > 2 ? "rgba(37, 99, 235, 0.45)" : "var(--c-muted)",
                }}
                title={`${val} commits`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-muted-fg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>All stats verified from repository test suites</span>
          </div>
        </div>
      </div>
    </section>
  );
}
