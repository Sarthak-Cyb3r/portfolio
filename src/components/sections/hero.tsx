"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { motion } from "motion/react";
import { GITHUB_URL } from "@/data/site";
import { Button } from "@/components/ui/button";
import { HeroDevice3D } from "@/components/sections/hero-device-3d";
import { Spotlight } from "@/components/ui/spotlight";
import { BorderBeam } from "@/components/ui/border-beam";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const line1 = "I build and ship real apps:";
  const line2 = "Android, iOS, Linux and web.";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-24 pb-20 sm:pt-32 sm:pb-32 overflow-hidden bg-dot-pattern"
    >
      {/* Background Radial Aurora Wash */}
      <div className="absolute inset-0 hero-radial-wash pointer-events-none" />

      {/* Cursor Spotlight Overlay */}
      <Spotlight className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mb-6"
            >
              <Link
                href="/projects/softify"
                className="relative group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-card/80 dark:bg-card/60 backdrop-blur-md text-fg border border-border hover:border-primary/40 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span>Softify v2.0.5 is out</span>
                <span className="text-muted-fg group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  →
                </span>
                <BorderBeam size={80} duration={8} colorFrom="#2563EB" colorTo="#7C3AED" />
              </Link>
            </motion.div>

            {/* H1 Masked line-by-line reveal */}
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
                    {line1}
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%", filter: "blur(6px)" }}
                    animate={{ y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease, delay: 0.2 }}
                    className="block text-gradient-shimmer"
                  >
                    {line2}
                  </motion.span>
                </span>
              </span>
            </h1>

            {/* One-line subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.35 }}
              className="mt-6 text-[17px] sm:text-lg leading-[1.6] text-muted-fg max-w-[62ch]"
            >
              Solo builder, age 16. Softify, Ludo and StudyStack are live, downloadable and tested.
            </motion.p>

            {/* 2 CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="relative group">
                <Button href="#work" variant="primary" size="lg" shimmer>
                  <span>View work</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <Button
                href={GITHUB_URL}
                external
                variant="secondary"
                size="lg"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </Button>
            </motion.div>

            {/* Quiet row: Shipped platforms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-border/80 w-full flex items-center gap-3 text-xs font-medium text-muted-fg tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Shipped on Android · iOS · Linux · Web</span>
            </motion.div>
          </div>

          {/* Right Column: 3D Standout Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.25 }}
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
