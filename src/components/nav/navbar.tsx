"use client";

import {
  GithubLogo,
  List,
  MagnifyingGlass,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/ui/command-menu";
import { SoundToggle } from "@/components/ui/sound-toggle";

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
  if (typeof document === "undefined") return "dark";
  return (
    (document.documentElement.getAttribute("data-theme") as "dark" | "light") ??
    "dark"
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => "dark",
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked — the attribute still applies for this session */
    }
  };

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-[var(--c-line)] text-[var(--c-muted)] transition-colors hover:border-[var(--c-line-strong)] hover:text-[var(--c-text)]",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun size={17} weight="regular" aria-hidden />
      ) : (
        <Moon size={17} weight="regular" aria-hidden />
      )}
    </button>
  );
}

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrollSnapshot() {
  if (typeof window === "undefined") return false;
  return window.scrollY > 24;
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const isProjects = pathname.startsWith("/projects");
  const currentActive = isProjects ? "/projects" : active;

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = site.nav
      .filter((item) => item.href.startsWith("/#"))
      .map((item) => document.getElementById(item.href.slice(2)))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`/#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-[border-color,background-color] duration-300",
          scrolled
            ? "glass border-b border-[var(--c-line)]"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-[0.8rem] font-medium uppercase tracking-[0.2em] text-[var(--c-text)]"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-md bg-[linear-gradient(135deg,#7C5CFF,#38E1FF)] text-[0.7rem] font-bold text-[#08080C] transition-transform duration-300 group-hover:-rotate-6"
            >
              S
            </span>
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const isActive = currentActive === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                    isActive
                      ? "text-[var(--c-text)]"
                      : "text-[var(--c-muted)] hover:text-[var(--c-text)]",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--c-line)] bg-[var(--c-surface-2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CommandMenu />
            <SoundToggle className="hidden sm:grid" />
            <ThemeToggle />
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`GitHub profile of ${site.name} (opens in a new tab)`}
              className="hidden h-10 w-10 place-items-center rounded-full border border-[var(--c-line)] text-[var(--c-muted)] transition-colors hover:border-[var(--c-line-strong)] hover:text-[var(--c-text)] sm:grid"
            >
              <GithubLogo size={17} weight="regular" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--c-line)] text-[var(--c-muted)] md:hidden"
            >
              {open ? (
                <X size={17} weight="regular" aria-hidden />
              ) : (
                <List size={17} weight="regular" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] bg-[var(--c-bg)] pt-16 md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="shell flex flex-col gap-1 py-8"
            >
              {site.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index + 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-[var(--c-line)] py-4 font-display text-3xl text-[var(--c-text)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      window.dispatchEvent(
                        new KeyboardEvent("keydown", {
                          key: "k",
                          metaKey: true,
                          bubbles: true,
                        }),
                      );
                    }, 100);
                  }}
                  className="flex items-center gap-2 rounded-full border border-[var(--c-line)] px-4 py-2 text-sm text-[var(--c-muted)] hover:text-[var(--c-text)]"
                >
                  <MagnifyingGlass size={16} className="text-accent-2" />
                  <span>Search commands</span>
                  <span className="rounded bg-[var(--c-surface-2)] px-1.5 py-0.5 font-mono text-xs">⌘K</span>
                </button>
                <SoundToggle />
              </motion.div>

              <motion.a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--c-line)] px-4 py-2.5 text-sm text-[var(--c-muted)]"
                onClick={() => setOpen(false)}
              >
                <GithubLogo size={16} aria-hidden />
                {site.handle}
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
