import Link from "next/link";
import { GITHUB_URL, EMAIL } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border/80 bg-card/40 py-14 overflow-hidden">
      {/* Subtle Bottom Ambient Wash */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/80">
          <div>
            <div className="text-base font-semibold text-fg tracking-tight">Sarthak</div>
            <p className="text-xs text-muted-fg mt-1">
              Software Developer &amp; Systems Builder · Age 16
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-fg font-medium">
            <Link href="/#work" className="hover:text-fg transition-colors">
              Work
            </Link>
            <Link href="/projects/softify" className="hover:text-fg transition-colors">
              Softify
            </Link>
            <Link href="/projects/macos-tahoe" className="hover:text-fg transition-colors">
              macOS Tahoe
            </Link>
            <Link href="/projects/ludo-vercel" className="hover:text-fg transition-colors">
              Ludo
            </Link>
            <Link href="/#terminal" className="hover:text-fg transition-colors">
              Terminal
            </Link>
            <Link href="/#about" className="hover:text-fg transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-fg transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-fg">
          <div>© 2026 Sarthak · Engineered with Next.js, Motion &amp; TypeScript</div>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-fg transition-colors underline underline-offset-2"
            >
              GitHub
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-fg transition-colors underline underline-offset-2"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
