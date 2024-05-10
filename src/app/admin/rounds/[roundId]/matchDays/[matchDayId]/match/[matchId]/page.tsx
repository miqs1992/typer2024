import Link from "next/link";
import { EditMatchForm } from "@/components/admin/rounds/match-days/match/edit-match-form";
import { getMatch } from "@/lib/actions/match";
import { MatchParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match/[matchId]/match.params";

const EditMatchPage = async ({ params }: MatchParams) => {
  const match = await getMatch(params.matchId);

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href={`/admin/rounds/${params.roundId}/matchDays/${params.matchDayId}`}
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Match Day
        </Link>
        <h1 className="inline-block">Edit match</h1>
      </div>
      <EditMatchForm
        match={JSON.parse(JSON.stringify(match))}
        matchDayId={params.matchDayId}
        roundId={params.roundId}
      />
    </div>
  );
};

export default EditMatchPage;
