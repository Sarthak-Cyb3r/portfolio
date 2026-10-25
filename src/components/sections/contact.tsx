"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight, Clock, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon } from "@/components/ui/icons";
import { EMAIL, GITHUB_URL } from "@/data/site";
import { Button } from "@/components/ui/button";

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
    <section id="contact" className="py-24 sm:py-32 border-t border-border">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl">
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-muted text-fg border border-border mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Available for engineering projects</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg leading-tight mb-4">
              Let&apos;s build something enduring.
            </h2>

            <p className="text-base text-muted-fg leading-relaxed mb-8 max-w-[52ch]">
              Whether you need a high-performance native client, an offline-first architecture, or a deterministic real-time engine, let&apos;s connect.
            </p>

            {/* Actions & Timezone */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleCopyEmail}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Email copied</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Timezone */}
              <div className="flex items-center gap-3 pt-4 sm:pt-0 sm:border-l sm:border-border sm:pl-6 text-xs font-mono text-muted-fg">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-muted-fg" />
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
        </div>
      </div>
    </section>
  );
}
