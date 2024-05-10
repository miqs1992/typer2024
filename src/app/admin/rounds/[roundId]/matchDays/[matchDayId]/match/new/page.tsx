import { MatchForm } from "@/components/admin/rounds/match-days/match/match-form";
import { getTeams } from "@/lib/actions/teams";
import Link from "next/link";
import { MatchDayParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match-day.params";

const NewMatchPage = async ({ params }: MatchDayParams) => {
  const teams = await getTeams();

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to matches
        </Link>
        <h1 className="inline-block">New Match</h1>
      </div>

      <MatchForm
        teams={teams}
        matchDayId={params.matchDayId}
        roundId={params.roundId}
      />
    </div>
  );
};

export default NewMatchPage;
