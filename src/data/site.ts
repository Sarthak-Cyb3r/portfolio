export const githubUsername = "Sarthak-Cyb3r";

export const site = {
  name: "Sarthak",
  handle: `@${githubUsername}`,
  role: "Vibe Coder & 11th Grader",
  headline: "Sarthak: 16, vibe coder building apps, games & tools",
  subline:
    "16-year-old 11th grader studying in Chinmaya Vidyalaya. Self-taught vibe coder shipping things I actually want to use — a 320kbps Android music streamer, a multiplayer game, a study planner and a finance tracker. Everything here is real code, real builds, real downloads.",
  age: 16,
  grade: "11th Grade",
  school: "Chinmaya Vidyalaya",
  education: "11th grader studying in Chinmaya Vidyalaya",
  githubUrl: `https://github.com/${githubUsername}`,
  githubApiRepos: `https://api.github.com/users/${githubUsername}`,
  email: "lakh125yu@gmail.com",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Terminal", href: "/#console" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/#about" },
    { label: "How I build", href: "/#process" },
  ],
  footerNote: "Built with Next.js, Motion and React Three Fiber. No templates.",
} as const;

export const sections = {
  hero: "hero",
  work: "work",
  stats: "stats",
  console: "console",
  stack: "stack",
  about: "about",
  process: "process",
} as const;

export const processSteps = [
  {
    title: "Want it first",
    body: "Every project starts as something I wished existed — a Ludo night with friends that didn't need an account, one screen that answers what to study.",
    icon: "Sparkle",
  },
  {
    title: "Prompt, then read the diff",
    body: "I vibe-code in long sessions with an AI pair, but I read what it writes. If I can't explain a function, I don't ship it.",
    icon: "TerminalWindow",
  },
  {
    title: "Break it on purpose",
    body: "Six players instead of four, an empty room, a bad network. I write the ugly cases down and make the app survive them.",
    icon: "BugBeetle",
  },
  {
    title: "Ship the artifact",
    body: "Not a screenshot — a site you can open, an .apk you can install, a .deb you can double-click. If it doesn't run, it isn't done.",
    icon: "Package",
  },
] as const;
