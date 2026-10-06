"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  EnvelopeSimple,
  GitBranch,
  GithubLogo,
  MagnifyingGlass,
  TerminalWindow,
} from "@phosphor-icons/react";
import Link from "next/link";
import { HeroCenterpiece } from "@/components/hero/hero-centerpiece";
import { Magnetic } from "@/components/motion/interactive";
import { Reveal, WordReveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { sound } from "@/lib/sound";

export function Hero() {
  const triggerCommandPalette = () => {
    sound.playClick(1400);
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24"
    >
      {/* Background blueprint grid & radial glow */}
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#7C5CFF]/15 via-[#38E1FF]/12 to-transparent blur-[120px]"
      />

      <div className="shell flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-16">
        {/* Left Column: Headlines & CTAs */}
        <div className="flex max-w-2xl flex-col items-start text-left">
          {/* Top Announcement Pill */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/projects/softify"
                onClick={() => sound.playClick(1200)}
                className="group inline-flex items-center gap-2 rounded-full border border-accent-3/40 bg-surface-2/80 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-accent-3 hover:bg-surface-2 shadow-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-accent-3 animate-pulse" />
                <span className="font-mono text-xs text-text font-medium">
                  New: Softify v1.0 (Android APK)
                </span>
                <span className="font-mono text-[0.65rem] text-muted group-hover:text-accent-3 flex items-center gap-0.5">
                  Get App <ArrowRight size={11} weight="bold" />
                </span>
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-xs text-accent-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                <span>11th Grader @ Chinmaya Vidyalaya</span>
              </span>

              <a
                href={`mailto:${site.email}`}
                onClick={() => sound.playClick(1300)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-xs text-muted hover:text-text hover:border-accent-3 transition-colors"
                title={`Send email to ${site.email}`}
              >
                <EnvelopeSimple size={12} className="text-accent-3" />
                <span>{site.email}</span>
              </a>

              <button
                type="button"
                onClick={triggerCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-xs text-muted hover:text-text hover:border-accent-2 transition-colors"
              >
                <MagnifyingGlass size={12} className="text-accent-2" />
                <span>Command Menu</span>
                <kbd className="rounded bg-surface-2 px-1 text-[0.625rem]">⌘K</kbd>
              </button>
            </div>
          </Reveal>

          <h1 id="hero-title" className="sr-only">
            {site.headline}
          </h1>

          <div aria-hidden="true" className="mt-6">
            <WordReveal
              text={site.headline}
              as="h2"
              className="font-display text-[clamp(2.5rem,1.4rem+4.2vw,4.75rem)] font-extrabold leading-[1.03] tracking-tight text-text"
            />
          </div>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {site.subline}
            </p>
          </Reveal>

          {/* Real-time mini git / system badge */}
          <Reveal delay={0.35} className="mt-6 w-full max-w-lg">
            <div className="rounded-xl border border-line bg-surface/80 p-3.5 backdrop-blur-sm font-mono text-xs text-muted flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[0.7rem] text-faint border-b border-line/60 pb-1.5">
                <span className="flex items-center gap-1.5 text-accent-2 font-medium">
                  <GitBranch size={13} weight="bold" />
                  main @ Sarthak-Cyb3r
                </span>
                <span className="flex items-center gap-1 text-ok">
                  <CheckCircle size={12} weight="fill" />
                  455 Passing Tests · 0 Build Errors
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-text truncate max-w-[280px]">
                  feat(softify): Flutter 320kbps audio + Android APK
                </span>
                <span className="text-accent-3 font-semibold shrink-0">v1.0.0</span>
              </div>
            </div>
          </Reveal>

          {/* Magnetic CTA Row */}
          <Reveal delay={0.45} className="mt-8 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.25}>
              <Button href="#work" onClick={() => sound.playClick(1000)}>
                Explore Projects
                <ArrowDown size={15} weight="bold" aria-hidden="true" />
              </Button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Button
                href={site.githubUrl}
                external
                variant="outline"
                onClick={() => sound.playClick(1100)}
              >
                <GithubLogo size={17} weight="regular" aria-hidden="true" />
                GitHub Profile
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </Button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Button
                href="#console"
                variant="quiet"
                onClick={() => sound.playClick(1200)}
              >
                <TerminalWindow size={15} weight="bold" className="text-accent-3" />
                Open Terminal
              </Button>
            </Magnetic>
          </Reveal>

          {/* Live Micro Badges */}
          <Reveal delay={0.55} className="mt-10 flex flex-wrap items-center gap-6 border-t border-line/60 pt-5 font-mono text-xs text-faint">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              <span>Real 95MB Deb &amp; 4.5MB APK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-3" />
              <span>Zero Fake Links / Pure Code</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
              <span>Next.js 16 Turbopack</span>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 3D Interactive Centerpiece */}
        <Reveal delay={0.2} className="flex shrink-0 items-center justify-center relative">
          <HeroCenterpiece />
        </Reveal>
      </div>
    </section>
  );
}
