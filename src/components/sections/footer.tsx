import { GithubLogo, ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--c-line)] bg-[var(--c-bg-deep)]">
      <div className="shell section !pb-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="kicker mb-5">Contact</p>
            <h2 className="text-[clamp(1.8rem,1rem+3vw,3rem)]">
              Found something you want built?
            </h2>
            <p className="mt-4 text-[var(--c-muted)]">
              I read every message. For collaborations, questions, or product feedback, reach out directly via email or GitHub.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(105deg,#7C5CFF_0%,#38E1FF_55%,#C6FF4A_100%)] px-6 py-3 text-sm font-semibold text-[#08080C] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <EnvelopeSimple size={17} weight="bold" aria-hidden />
                <span>{site.email}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden />
              </a>

              <a
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--c-line)] bg-surface px-5 py-3 text-sm font-medium text-[var(--c-text)] hover:border-line-strong transition-colors"
              >
                <GithubLogo size={17} weight="regular" aria-hidden />
                {site.handle}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--c-muted)] transition-colors hover:text-[var(--c-text)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-accent-3 transition-colors hover:underline"
            >
              {site.email}
            </a>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[var(--c-muted)] transition-colors hover:text-[var(--c-text)]"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--c-line)] pt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--c-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name} — {site.role} ({site.email})
          </span>
          <span>{site.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
