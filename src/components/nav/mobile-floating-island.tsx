"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import {
  DownloadSimple,
  EnvelopeSimple,
  MagnifyingGlass,
  SpeakerSlash,
  Check,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";
import { sound } from "@/lib/sound";

const SECTIONS = [
  { id: "hero", label: "HERO" },
  { id: "stats", label: "METRICS" },
  { id: "work", label: "SHOWCASE" },
  { id: "console", label: "CLI" },
  { id: "about", label: "ABOUT" },
  { id: "process", label: "PROCESS" },
];

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getActiveSectionSnapshot(): string {
  if (typeof window === "undefined") return "HERO";
  if (window.scrollY < 120) return "HERO";
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (el && el.offsetTop <= scrollPos) {
      return SECTIONS[i].label;
    }
  }
  return "HERO";
}

function subscribeSound(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("sound-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sound-change", callback);
  };
}

function getSoundSnapshot(): boolean {
  return sound.isEnabled();
}

export function MobileFloatingIsland() {
  const activeLabel = useSyncExternalStore(
    subscribeScroll,
    getActiveSectionSnapshot,
    () => "HERO",
  );

  const soundEnabled = useSyncExternalStore(
    subscribeSound,
    getSoundSnapshot,
    () => false,
  );

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Hide only on fast scroll down past 120px
      if (delta > 25 && currentY > 120) {
        setVisible(false);
      } else if (delta < -10 || currentY <= 80) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCommandOpen = () => {
    sound.playClick(1400);
    window.dispatchEvent(new Event("open-command-menu"));
  };

  const handleCopyEmail = async () => {
    sound.playChime();
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Fallback
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);

    // Also trigger mailto after short delay
    setTimeout(() => {
      window.location.href = `mailto:${site.email}`;
    }, 400);
  };

  const handleDownload = () => {
    sound.playChime();
    const link = document.createElement("a");
    link.href = "/downloads/ludo-vercel/ludo-with-friends.apk";
    link.download = "ludo-with-friends.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleSound = () => {
    sound.toggle();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("sound-change"));
    }
  };

  return (
    <div
      aria-label="Mobile quick actions"
      className="fixed bottom-4 inset-x-3.5 z-40 max-w-sm mx-auto pointer-events-none md:hidden flex flex-col items-center gap-2"
    >
      {/* Toast bubble when email is copied */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="rounded-full bg-accent-2 px-3 py-1 text-[#08080C] font-mono text-xs font-bold shadow-xl flex items-center gap-1.5 pointer-events-auto"
          >
            <Check size={13} weight="bold" />
            <span>Copied {site.email}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Island Dock */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: visible ? 0 : 80,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="pointer-events-auto flex items-center justify-between w-full rounded-full border border-white/15 bg-[#08080C]/85 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_20px_rgba(56,225,255,0.15)] backdrop-blur-xl"
      >
        {/* Active Section Pill */}
        <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[0.65rem] text-accent-2 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse" />
          <span className="tracking-wider">{activeLabel}</span>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-1.5">
          {/* Quick Search */}
          <button
            type="button"
            onClick={handleCommandOpen}
            aria-label="Search commands"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all active:scale-90 hover:text-text hover:border-accent-2"
          >
            <MagnifyingGlass size={16} weight="bold" />
          </button>

          {/* Quick Download APK */}
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download Ludo Android APK"
            className="flex h-9 items-center gap-1 rounded-full border border-accent-3/40 bg-accent-3/15 px-2.5 text-accent-3 font-mono text-[0.7rem] font-bold transition-all active:scale-90 hover:bg-accent-3/25"
          >
            <DownloadSimple size={14} weight="bold" />
            <span>APK</span>
          </button>

          {/* Quick Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={`Email ${site.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all active:scale-90 hover:text-text hover:border-accent-2"
          >
            <EnvelopeSimple size={16} weight="bold" />
          </button>

          {/* Interactive Synthesizer Equalizer */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={soundEnabled ? "Mute interactive audio" : "Enable interactive audio"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-accent-2 transition-all active:scale-90 hover:border-accent-2"
          >
            {soundEnabled ? (
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 bg-accent-2 rounded-full h-2 animate-[soundwave_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-accent-3 rounded-full h-3 animate-[soundwave_1.1s_ease-in-out_0.2s_infinite]" />
                <span className="w-0.5 bg-accent rounded-full h-1.5 animate-[soundwave_0.7s_ease-in-out_0.4s_infinite]" />
              </div>
            ) : (
              <SpeakerSlash size={16} weight="bold" className="text-muted" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
