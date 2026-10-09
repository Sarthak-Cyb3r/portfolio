"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sun, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon } from "@/components/ui/icons";
import { site, GITHUB_URL } from "@/data/site";
import { cn } from "@/lib/utils";

const THEME_KEY = "sarthak-theme";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

function getThemeSnapshot(): "dark" | "light" {
  if (typeof document === "undefined") return "light";
  return (
    (document.documentElement.getAttribute("data-theme") as "dark" | "light") ??
    "light"
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "light"
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore storage failure */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full text-muted-fg hover:text-fg hover:bg-muted/80 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent outline-none",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 120 && currentY > lastY + 8) {
        setHidden(true);
      } else if (currentY < lastY - 8 || currentY <= 50) {
        setHidden(false);
      }
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sectionIds = ["work", "about", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const triggerCommandMenu = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full bg-card/85 dark:bg-card/80 backdrop-blur-xl border border-border px-3 sm:px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        {/* Logo / Monogram */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-1 pr-2 text-sm font-semibold tracking-tight text-fg hover:opacity-80 transition-opacity"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>{site.name}</span>
        </Link>

        {/* Desktop Dock Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 rounded-full transition-colors cursor-pointer",
                  isActive ? "text-fg font-semibold" : "text-muted-fg hover:text-fg"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 rounded-full bg-muted border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions Dock */}
        <div className="flex items-center gap-1 sm:gap-1.5 border-l border-border/80 pl-2">
          {/* Command palette */}
          <button
            type="button"
            onClick={triggerCommandMenu}
            aria-label="Open command palette (⌘K)"
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-fg hover:text-fg hover:bg-muted/80 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* GitHub link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-fg hover:text-fg hover:bg-muted/80 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-muted-fg hover:text-fg hover:bg-muted/80 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-accent outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto rounded-2xl border border-border bg-card/95 backdrop-blur-2xl p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50"
          >
            <nav className="flex flex-col gap-2 text-base font-medium">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-fg hover:bg-muted transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-fg font-mono">→</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
