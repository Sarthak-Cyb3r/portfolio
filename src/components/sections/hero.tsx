"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { GITHUB_URL } from "@/data/site";
import { HeroDevice3D } from "@/components/sections/hero-device-3d";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Release Status Pill */}
            <div className="mb-6">
              <Link
                href="/projects/softify"
                className="group inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/80 text-fg border border-border hover:border-border-hover transition-colors"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-muted-fg">Release</span>
                <span className="text-fg font-semibold">Softify v3.0.1</span>
                <span className="text-muted-fg group-hover:text-fg group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </Link>
            </div>

            {/* H1 Headline */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-[-0.035em] leading-[1.08] text-fg text-balance"
            >
              I build and ship real apps: Android, iOS, Linux and web.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-[17px] sm:text-lg leading-[1.65] text-muted-fg max-w-[58ch]">
              Solo builder, age 16. Low-level C hooks, Flutter audio engines with SQLite FTS5, and zero-build multiplayer games. Tested, open source, and offline-first.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90 transition-opacity"
              >
                <span>View work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-fg hover:border-border-hover transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-muted-fg" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-fg" />
              </a>

              <Link
                href="#terminal"
                className="inline-flex items-center gap-2 text-xs font-mono text-muted-fg hover:text-fg transition-colors py-2 px-1"
              >
                <Terminal className="w-3.5 h-3.5 text-muted-fg" />
                <span>$ terminal</span>
              </Link>
            </div>

            {/* Platform indicator */}
            <div className="mt-12 pt-6 border-t border-border w-full flex items-center gap-2 text-xs font-mono text-muted-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Shipped native across Android · iOS · Linux · Web</span>
            </div>
          </div>

          {/* Right Column: Clean Hardware Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroDevice3D />
          </div>
        </div>
      </div>
    </section>
  );
}
