import { CinematicStage } from "@/components/scroll/cinematic-stage";
import { getLatestSoftifyCommit } from "@/lib/github";

export default async function Home() {
  const latestCommit = await getLatestSoftifyCommit();

  return <CinematicStage latestCommit={latestCommit} />;
}
