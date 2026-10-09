export const EMAIL = "lakh125yu@gmail.com";
export const SITE_URL = "https://sarthak-cyb3r.vercel.app";
export const GITHUB_USERNAME = "Sarthak-Cyb3r";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

/** Verified automated test counts from repository test suites */
export const VERIFIED_TEST_STATS = {
  studyStackPassing: 455,
  softifyPassing: 170,
  totalPassing: 625,
} as const;

export const site = {
  name: "Sarthak",
  handle: `@${GITHUB_USERNAME}`,
  role: "Software Developer & Systems Builder",
  headline: "I build and ship real apps: Android, iOS, Linux and web.",
  subline:
    "Solo builder, age 16. Softify, Ludo and StudyStack are live, downloadable and tested.",
  age: 16,
  githubUrl: GITHUB_URL,
  githubApiRepos: `https://api.github.com/users/${GITHUB_USERNAME}`,
  email: EMAIL,
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  footerNote: "© 2026 Sarthak",
} as const;

export const sections = {
  hero: "hero",
  work: "work",
  stats: "stats",
  tech: "tech",
  process: "process",
  terminal: "terminal",
  about: "about",
  contact: "contact",
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Identify the problem",
    body: "Every project starts from a clear personal friction point — a frictionless multiplayer game, or a unified student schedule.",
  },
  {
    step: "02",
    title: "Architect for resilience",
    body: "Decouple domain logic from presentation. Choose robust primitives like SQLite FTS5, client isolates, and clean architecture.",
  },
  {
    step: "03",
    title: "Test edge conditions",
    body: "Stress test 6-player board topologies, flaky connections, and offline audio atom shifting with regression test suites.",
  },
  {
    step: "04",
    title: "Ship verifiable artifacts",
    body: "Compile native binaries (.apk, .deb), test deploy targets, and publish checksum-verified release packages.",
  },
] as const;

export const techGroups = [
  {
    label: "Mobile",
    items: ["Flutter", "Dart", "Android SDK", "Capacitor"],
  },
  {
    label: "Web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend & Data",
    items: ["Node.js", "SQLite", "Firebase Firestore", "Express"],
  },
  {
    label: "Tooling & Infra",
    items: ["Git", "Linux", "Docker", "Vercel"],
  },
] as const;
