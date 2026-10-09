import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Tech } from "@/components/sections/tech";
import { HowIBuild } from "@/components/sections/how-i-build";
import { TerminalConsole } from "@/components/sections/terminal-console";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ProofStrip />
      <Tech />
      <HowIBuild />
      <TerminalConsole />
      <About />
      <Contact />
    </>
  );
}
