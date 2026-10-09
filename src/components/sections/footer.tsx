import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { GITHUB_URL, EMAIL } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border/80 bg-bg pt-12 pb-16 overflow-hidden">
      {/* Giant Faded Typographic Watermark */}
      <div
        className="pointer-events-none select-none absolute bottom-0 inset-x-0 flex justify-center overflow-hidden"
        aria-hidden
      >
        <span className="text-[16vw] font-black tracking-tighter text-fg opacity-[0.035] dark:opacity-[0.03] leading-none translate-y-1/4">
          SARTHAK
        </span>
      </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-fg">
        <div className="flex items-center gap-2">
          <span>© 2026 Sarthak</span>
          <span>·</span>
          <span>Engineered with Next.js & Tailwind</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub Profile"
            className="text-muted-fg hover:text-fg transition-colors p-1"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Send Email"
            className="text-muted-fg hover:text-fg transition-colors p-1"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
