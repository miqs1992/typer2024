import { RoundsParams } from "@/app/rounds/[roundId]/rounds.params";
import { getRoundRanking } from "@/modules/ranking/ranking.actions";
import { RoundRanking } from "@/components/main/ranking/round-ranking";
import { getRoundById } from "@/modules/matches/round.actions";

export const dynamic = "force-dynamic";

const RoundPage = async ({ params }: RoundsParams) => {
  const round = await getRoundById(params.roundId);
  const rankingData = await getRoundRanking(params.roundId);

  return <RoundRanking rankingData={rankingData} roundName={round.name} />;
};
export default RoundPage;
