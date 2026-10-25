import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { FeaturedWork } from "@/components/sections/featured-work";
import { HowIBuild } from "@/components/sections/how-i-build";
import { Tech } from "@/components/sections/tech";
import { TerminalConsole } from "@/components/sections/terminal-console";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { getLatestSoftifyCommit } from "@/lib/github";

export default async function Home() {
  const latestCommit = await getLatestSoftifyCommit();

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Hero />
      <ProofStrip latestCommit={latestCommit} />
      <FeaturedWork />
      <HowIBuild />
      <Tech />
      <TerminalConsole />
      <About />
      <Contact />
    </div>
  );
}
