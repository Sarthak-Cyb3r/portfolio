"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { motion, AnimatePresence } from "motion/react";
import { GITHUB_URL } from "@/data/site";
import { HeroDevice3D } from "@/components/sections/hero-device-3d";
import { Spotlight } from "@/components/ui/spotlight";

const ease = [0.22, 1, 0.36, 1] as const;
const KEYWORDS = ["Android", "iOS", "Linux", "Web"] as const;

export function Hero() {
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const activeKeyword = KEYWORDS[keywordIndex];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden bg-subtle-grid"
    >
      {/* Atmospheric Ambient Lighting Wash */}
      <div className="absolute inset-0 hero-ambient-wash pointer-events-none" />

      <Spotlight className="max-w-[1160px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6"
            >
              <Link
                href="/projects/softify"
                className="group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card/80 dark:bg-card/60 backdrop-blur-md text-fg border border-border hover:border-primary/50 shadow-xs transition-all duration-200"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-muted-fg">Release</span>
                <span className="text-fg font-semibold">Softify v3.0.1 is live</span>
                <span className="text-muted-fg group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
            </motion.div>

            {/* H1 Headline with Kinetic Rotating Platform Keyword */}
            <h1
              id="hero-heading"
              aria-label="I build and ship real apps: Android, iOS, Linux and web."
              className="text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-[-0.035em] leading-[1.08] text-fg text-balance"
            >
              <span className="sr-only">I build and ship real apps: Android, iOS, Linux and web.</span>
              <span aria-hidden="true">
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%", filter: "blur(6px)" }}
                    animate={{ y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease, delay: 0.1 }}
                    className="block"
                  >
                    I build and ship real apps:
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span className="inline-flex items-center flex-wrap gap-2 sm:gap-3">
                    <span className="relative inline-flex items-center h-[1.15em] overflow-hidden px-2.5 py-0.5 rounded-xl bg-primary/10 border border-primary/25 align-middle">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeKeyword}
                          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                          transition={{ duration: 0.35, ease }}
                          className="text-primary font-bold inline-block"
                        >
                          {activeKeyword}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span>and web.</span>
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="mt-6 text-[17px] sm:text-lg leading-[1.65] text-muted-fg max-w-[58ch]"
            >
              Solo builder, age 16. Low-level C hooks, Flutter audio engines with SQLite FTS5, and zero-build multiplayer games. Tested, open source, and offline-first.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#work"
                className="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary shadow-md shadow-primary/25 hover:shadow-primary/40 hover:opacity-95 transition-all duration-200"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 backdrop-blur-md px-4.5 py-2.5 text-sm font-medium text-fg hover:border-primary/40 transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4 text-muted-fg group-hover:text-fg transition-colors" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-fg group-hover:text-fg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="#terminal"
                className="inline-flex items-center gap-2 text-xs font-mono text-muted-fg hover:text-primary transition-colors py-2 px-1"
              >
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>$ terminal</span>
              </Link>
            </motion.div>

            {/* Platform indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
              className="mt-12 pt-6 border-t border-border/80 w-full flex items-center gap-2 text-xs font-mono text-muted-fg tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Shipped native across Android · iOS · Linux · Web</span>
            </motion.div>
          </div>

          {/* Right Column: 3D Standout Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <HeroDevice3D />
            </motion.div>
          </div>
        </div>
      </Spotlight>
    </section>
  );
}
