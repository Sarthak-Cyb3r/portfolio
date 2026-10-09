import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/nav/navbar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { Preloader } from "@/components/motion/preloader";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/sections/footer";
import { CommandMenu } from "@/components/ui/command-menu";
import { SITE_URL, GITHUB_URL } from "@/data/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sarthak — Softify, Ludo & StudyStack",
    template: "%s — Sarthak",
  },
  description:
    "Software developer building native Android, iOS, Linux, and web applications. Softify, Ludo, and StudyStack are live, tested, and downloadable.",
  keywords: [
    "Sarthak",
    "software engineer",
    "developer",
    "portfolio",
    "Softify",
    "Flutter",
    "Next.js",
    "Linux",
    "Android",
    "Ludo",
    "StudyStack",
  ],
  authors: [{ name: "Sarthak", url: GITHUB_URL }],
  creator: "Sarthak",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sarthak — Portfolio",
    title: "Sarthak — Softify, Ludo & StudyStack",
    description:
      "Software developer building native Android, iOS, Linux, and web applications. Softify, Ludo, and StudyStack are live, tested, and downloadable.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sarthak — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarthak — Softify, Ludo & StudyStack",
    description:
      "Software developer building native Android, iOS, Linux, and web applications. Softify, Ludo, and StudyStack are live, tested, and downloadable.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
};

const themeInitScript = `(function(){try{var k="sarthak-theme";var s=localStorage.getItem(k);var t=s?s:"light";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Sarthak",
      "url": SITE_URL,
      "jobTitle": "Software Developer",
      "sameAs": [GITHUB_URL],
    },
    {
      "@type": "SoftwareApplication",
      "name": "Softify",
      "operatingSystem": "Android, iOS, Linux, Web",
      "applicationCategory": "MultimediaApplication",
      "offers": { "@type": "Offer", "price": "0" },
    },
    {
      "@type": "SoftwareApplication",
      "name": "Ludo",
      "operatingSystem": "Web, Android, Linux",
      "applicationCategory": "GameApplication",
      "offers": { "@type": "Offer", "price": "0" },
    },
    {
      "@type": "SoftwareApplication",
      "name": "StudyStack",
      "operatingSystem": "Web",
      "applicationCategory": "ProductivityApplication",
      "offers": { "@type": "Offer", "price": "0" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${plusJakarta.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-bg text-fg min-h-screen selection:bg-accent selection:text-on-accent">
        <Providers>
          <Preloader />
          <CustomCursor />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-accent"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <CommandMenu />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
