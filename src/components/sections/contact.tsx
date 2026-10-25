"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight, Clock, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon } from "@/components/ui/icons";
import { EMAIL, GITHUB_URL } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 border-t border-border/80 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative z-10">
        <Spotlight className="rounded-3xl border border-border bg-card/90 dark:bg-card/75 backdrop-blur-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-muted/80 text-fg border border-border mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for engineering projects</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg leading-[1.1] mb-6">
              Let&apos;s build something exceptional.
            </h2>

            <p className="text-base sm:text-lg text-muted-fg leading-relaxed mb-8 max-w-[55ch]">
              Whether you need a high-performance native client, an offline-first architecture, or a deterministic real-time engine, let&apos;s connect.
            </p>

            {/* Actions & Timezone */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex flex-wrap items-center gap-3.5">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleCopyEmail}
                  className="group relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2 text-white font-semibold"
                      >
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Email copied!</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy email address</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <Button
                  href={GITHUB_URL}
                  external
                  variant="secondary"
                  size="lg"
                  className="group"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:border-l sm:border-border sm:pl-6 text-xs font-mono text-muted-fg">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-primary" />
                  <span>IST (UTC+5:30)</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-muted-fg" />
                  <span>Replies within 24h</span>
                </div>
              </div>
            </div>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
