import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
} from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { MobileFloatingIsland } from "@/components/nav/mobile-floating-island";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/sections/footer";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const url = "https://sarthak-cyb3r.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${site.name} — 16, 11th grader at Chinmaya Vidyalaya & vibe coder`,
    template: `%s — ${site.name}`,
  },
  description: site.subline,
  keywords: [
    "Sarthak",
    "vibe coder",
    "teen developer",
    "Chinmaya Vidyalaya",
    "portfolio",
    "Softify",
    "Flutter",
    "Android",
    "Ludo",
    "StudyStack",
    "Accounty",
  ],
  authors: [{ name: site.name, url: site.githubUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — 16, 11th grader at Chinmaya Vidyalaya & vibe coder`,
    description: site.subline,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.headline }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — 16, 11th grader at Chinmaya Vidyalaya & vibe coder`,
    description: site.subline,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080C" },
    { media: "(prefers-color-scheme: light)", color: "#F6F6F4" },
  ],
};

const themeInit = `(function(){try{var k="sarthak-theme";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s||(m?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--c-surface)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <MobileFloatingIsland />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
