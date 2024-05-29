import { MatchParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match/[matchId]/match.params";
import { getMatch } from "@/modules/admin/round-match-management/match.actions";
import Link from "next/link";
import { MatchForm } from "@/components/admin/rounds/match-days/match/match-form";

const EditMatchPage = async ({
  params: { matchId, matchDayId, roundId },
}: MatchParams) => {
  const match = await getMatch(matchId);

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href={`/admin/rounds/${roundId}/matchDays/${matchDayId}`}
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Match Day
        </Link>
        <h1 className="inline-block">Set match result</h1>
      </div>
      <MatchForm match={match} matchDayId={matchDayId} roundId={roundId} />
    </div>
  );
};

export default EditMatchPage;
