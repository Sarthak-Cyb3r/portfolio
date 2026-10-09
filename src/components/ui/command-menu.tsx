"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  ArrowRight,
  FolderGit2,
  Terminal,
  Compass,
  Sun,
  ExternalLink,
} from "lucide-react";
import { GITHUB_URL } from "@/data/site";
import { projects } from "@/data/projects";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items: CommandItem[] = [
    {
      id: "nav-work",
      category: "Navigation",
      title: "Selected Work",
      subtitle: "View flagship projects & case studies",
      icon: <FolderGit2 className="w-4 h-4" />,
      action: () => {
        router.push("/#work");
        setOpen(false);
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "About",
      subtitle: "Background and core engineering values",
      icon: <Compass className="w-4 h-4" />,
      action: () => {
        router.push("/#about");
        setOpen(false);
      },
    },
    {
      id: "nav-terminal",
      category: "Navigation",
      title: "Terminal Console",
      subtitle: "Interactive developer command line",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        router.push("/#terminal");
        setOpen(false);
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact",
      subtitle: "Get in touch",
      icon: <ArrowRight className="w-4 h-4" />,
      action: () => {
        router.push("/#contact");
        setOpen(false);
      },
    },
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      category: "Projects" as const,
      title: project.name,
      subtitle: project.tagline,
      icon: <FolderGit2 className="w-4 h-4 text-accent" />,
      action: () => {
        router.push(`/projects/${project.slug}`);
        setOpen(false);
      },
    })),
    {
      id: "action-theme",
      category: "Actions",
      title: "Toggle Theme",
      subtitle: "Switch between light and dark mode",
      icon: <Sun className="w-4 h-4" />,
      action: () => {
        const cur = document.documentElement.getAttribute("data-theme") || "light";
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("sarthak-theme", next);
        setOpen(false);
      },
    },
    {
      id: "action-github",
      category: "Actions",
      title: "GitHub Profile",
      subtitle: "View open-source repositories and commits",
      icon: <ExternalLink className="w-4 h-4" />,
      action: () => {
        window.open(GITHUB_URL, "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-[14px] bg-card border border-border shadow-[0_16px_36px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search className="w-4 h-4 text-muted-fg shrink-0" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-fg placeholder:text-muted-fg outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs text-muted-fg hover:text-fg px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-transparent">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-fg">
                  No matching commands or pages found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] cursor-pointer text-sm transition-colors ${
                        isSelected
                          ? "bg-accent text-on-accent"
                          : "text-fg hover:bg-muted/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={isSelected ? "text-on-accent" : "text-muted-fg"}>
                          {item.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate">{item.title}</span>
                          {item.subtitle && (
                            <span
                              className={`text-xs truncate ${
                                isSelected ? "text-on-accent/80" : "text-muted-fg"
                              }`}
                            >
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
