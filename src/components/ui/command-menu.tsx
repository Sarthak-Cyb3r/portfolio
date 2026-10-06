"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Code,
  Compass,
  DownloadSimple,
  EnvelopeSimple,
  GameController,
  GraduationCap,
  Headphones,
  MagnifyingGlass,
  SpeakerHigh,
  SpeakerSlash,
  Sun,
  TrendUp,
  X,
} from "@phosphor-icons/react";
import { site } from "@/data/site";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(() => sound.isEnabled());
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    sound.playClick(1400);
    setSearch("");
    setSelectedIndex(0);
    setOpen(true);
  };

  // Global keyboard listener for Cmd+K / Ctrl+K and open-command-menu custom event
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            sound.playClick(1400);
            setSearch("");
            setSelectedIndex(0);
          }
          return next;
        });
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const onCustomOpen = () => {
      sound.playClick(1400);
      setSearch("");
      setSelectedIndex(0);
      setOpen(true);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-menu", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-menu", onCustomOpen);
    };
  }, [open]);

  // Focus input & control body scroll when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const toggleSound = () => {
    const updated = sound.toggle();
    setSoundActive(updated);
  };

  const toggleTheme = () => {
    const cur = document.documentElement.getAttribute("data-theme") ?? "dark";
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sarthak-theme", next);
    } catch {}
    sound.playClick(1500);
  };

  // Commands registry
  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Home",
      subtitle: "Return to the hero overview",
      icon: <Compass size={18} className="text-accent" />,
      action: () => {
        router.push("/");
        setOpen(false);
      },
    },
    {
      id: "nav-work",
      category: "Navigation",
      title: "Featured Bento Grid",
      subtitle: "Jump to high-impact project showcases",
      icon: <Code size={18} className="text-accent-2" />,
      action: () => {
        router.push("/#work");
        setOpen(false);
      },
    },
    {
      id: "nav-terminal",
      category: "Navigation",
      title: "Interactive Terminal Console",
      subtitle: "Launch CLI with live test runners and downloads",
      icon: <Code size={18} className="text-accent-3" />,
      action: () => {
        router.push("/#console");
        setOpen(false);
      },
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "All Projects Directory",
      subtitle: "Filter all 4 projects by stack, status, and search",
      icon: <Compass size={18} className="text-accent-2" />,
      action: () => {
        router.push("/projects");
        setOpen(false);
      },
    },

    // Projects
    {
      id: "proj-ludo",
      category: "Projects",
      title: "Ludo Multiplayer",
      subtitle: "5-Player Pentagon board, live Firebase sync, .deb & .apk",
      badge: "Completed",
      icon: <GameController size={18} className="text-accent" />,
      action: () => {
        router.push("/projects/ludo-vercel");
        setOpen(false);
      },
    },
    {
      id: "proj-studystack",
      category: "Projects",
      title: "StudyStack",
      subtitle: "Academic task priority engine with 455 passing tests",
      badge: "455 Green",
      icon: <GraduationCap size={18} className="text-accent-2" />,
      action: () => {
        router.push("/projects/studystack");
        setOpen(false);
      },
    },
    {
      id: "proj-softify",
      category: "Projects",
      title: "Softify",
      subtitle: "Ad-free 320kbps Android music player & streaming engine",
      badge: "v1.0 APK",
      icon: <Headphones size={18} className="text-accent-3" />,
      action: () => {
        router.push("/projects/softify");
        setOpen(false);
      },
    },
    {
      id: "proj-accounty",
      category: "Projects",
      title: "Accounty",
      subtitle: "Personal cash-flow tracker and predictive run-rate graphs",
      badge: "In Dev",
      icon: <TrendUp size={18} className="text-accent-2" />,
      action: () => {
        router.push("/projects/accounty");
        setOpen(false);
      },
    },

    // Actions
    {
      id: "act-deb",
      category: "Actions",
      title: "Download Ludo Debian Package",
      subtitle: "ludo-with-friends-1.0.0-amd64.deb (95 MB)",
      badge: ".deb",
      icon: <DownloadSimple size={18} className="text-ok" />,
      action: () => {
        sound.playChime();
        const a = document.createElement("a");
        a.href = "/downloads/ludo-vercel/ludo-with-friends-1.0.0-amd64.deb";
        a.download = "ludo-with-friends-1.0.0-amd64.deb";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setOpen(false);
      },
    },
    {
      id: "act-apk",
      category: "Actions",
      title: "Download Ludo Android APK",
      subtitle: "ludo-with-friends.apk (4.5 MB)",
      badge: ".apk",
      icon: <DownloadSimple size={18} className="text-ok" />,
      action: () => {
        sound.playChime();
        const a = document.createElement("a");
        a.href = "/downloads/ludo-vercel/ludo-with-friends.apk";
        a.download = "ludo-with-friends.apk";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setOpen(false);
      },
    },
    {
      id: "act-softify-apk",
      category: "Actions",
      title: "Download Softify Android APK",
      subtitle: "Softify-v1.0.0-Universal.apk (65.4 MB)",
      badge: ".apk",
      icon: <DownloadSimple size={18} className="text-accent-3" />,
      action: () => {
        sound.playChime();
        window.open(
          "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.0/Softify-v1.0.0-Universal.apk",
          "_blank",
          "noopener,noreferrer"
        );
        setOpen(false);
      },
    },
    {
      id: "act-theme",
      category: "Actions",
      title: "Toggle Visual Theme",
      subtitle: "Switch between Dark OLED and Clean Daylight",
      icon: <Sun size={18} className="text-warn" />,
      action: () => {
        toggleTheme();
        setOpen(false);
      },
    },
    {
      id: "act-sound",
      category: "Actions",
      title: soundActive ? "Disable Audio Synthesizer" : "Enable Audio Synthesizer",
      subtitle: "Web Audio API micro-haptics on clicks & commands",
      badge: soundActive ? "ON" : "OFF",
      icon: soundActive ? <SpeakerHigh size={18} className="text-accent-3" /> : <SpeakerSlash size={18} className="text-muted" />,
      action: () => {
        toggleSound();
      },
    },
    {
      id: "act-email",
      category: "Actions",
      title: "Send Email to Sarthak",
      subtitle: `${site.email} — Click to open mail composer or copy`,
      badge: "Email",
      icon: <EnvelopeSimple size={18} className="text-accent-3" />,
      action: () => {
        sound.playChime();
        navigator.clipboard?.writeText(site.email);
        window.open(`mailto:${site.email}`, "_self");
        setOpen(false);
      },
    },
    {
      id: "act-github",
      category: "Actions",
      title: "Open GitHub Profile",
      subtitle: "Inspect open source repositories @ Sarthak-Cyb3r",
      icon: <Code size={18} className="text-muted" />,
      action: () => {
        window.open(site.githubUrl, "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playClick(1000);
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playClick(1000);
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      sound.playClick(1400);
      filtered[selectedIndex].action();
    }
  };

  return (
    <>
      {/* Floating Trigger Chip on Navbar / Page */}
      <button
        type="button"
        onClick={openMenu}
        aria-label="Open command palette"
        className="hidden md:flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs text-muted backdrop-blur-md transition-all hover:border-line-strong hover:text-text hover:bg-surface shadow-sm"
      >
        <MagnifyingGlass size={13} className="text-accent-2" />
        <span>Quick search...</span>
        <kbd className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.65rem] text-faint">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-16 sm:pt-24">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-[#000000]/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-line-strong bg-surface p-0 shadow-2xl overflow-hidden z-10"
            >
              {/* Header Input */}
              <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
                <MagnifyingGlass size={18} className="text-accent-2 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command, project name, or action..."
                  className="w-full bg-transparent font-sans text-sm text-text placeholder:text-faint focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-faint hover:text-text transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="max-h-[380px] overflow-y-auto p-2 divide-y divide-transparent font-sans"
              >
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-sm text-faint">
                    No commands matching &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          sound.playClick(1400);
                          item.action();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-surface-2 text-text border border-line"
                            : "text-muted hover:bg-surface-2/60 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-8 w-8 rounded-lg bg-surface border border-line flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-text text-sm">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] text-accent-2">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <p className="text-[0.75rem] text-muted truncate">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className="font-mono text-[0.65rem] text-faint uppercase">
                            {item.category}
                          </span>
                          <ArrowRight
                            size={13}
                            className={`transition-transform ${
                              isSelected ? "translate-x-0.5 text-accent-2" : "text-faint"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer shortcuts */}
              <div className="flex items-center justify-between border-t border-line bg-surface-2/50 px-4 py-2 font-mono text-[0.6875rem] text-faint">
                <div className="flex items-center gap-3">
                  <span>
                    <kbd className="rounded border border-line px-1 py-0.5">↑↓</kbd> to navigate
                  </span>
                  <span>
                    <kbd className="rounded border border-line px-1 py-0.5">↵</kbd> to select
                  </span>
                  <span>
                    <kbd className="rounded border border-line px-1 py-0.5">ESC</kbd> to close
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  <span>Sarthak OS v2.6</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
