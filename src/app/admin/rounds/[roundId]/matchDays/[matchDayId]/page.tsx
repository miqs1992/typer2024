import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { AddMatchForm } from "@/components/add-match-form/add-match-form";
import { getTeams } from "@/lib/actions/teams";
import { getMatches } from "@/lib/actions/match";
import FlagIcon from "@/components/flagIcon/flagIcon";
import { Results } from "@/components/results/results";
import { getRound } from "@/lib/actions/rounds";
import { getMatchDays } from "@/lib/actions/matchDays";

const EditMatchDayPage = async ({ params }: Params) => {
  const matchDays = await getMatchDays(params.roundId);
  const teams = await getTeams();
  const matches = await getMatches(params.matchDayId);

  const matchDayNumber = matchDays.find(
    (matchDay) => matchDay.id === params.matchDayId,
  )?.dayNumber;

  const header = `Match Day ${matchDayNumber}`;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      {/* <Link
        className="font-white"
        href={`/admin/rounds/${params.roundId}`}
      ></Link> */}
      <h1 className="my-10 text-center text-3xl font-bold text-white">
        {header}
      </h1>
      {matches.length ? (
        <Results
          matches={JSON.parse(JSON.stringify(matches))}
          roundId={params.roundId}
          matchDayId={params.matchDayId}
        />
      ) : null}
      <AddMatchForm
        teams={teams}
        matchDayId={params.matchDayId}
        roundId={params.roundId}
      />
    </div>
  );
};

export default EditMatchDayPage;
