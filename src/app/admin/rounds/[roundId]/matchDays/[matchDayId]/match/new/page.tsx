import { MatchForm } from "@/components/admin/rounds/match-days/match/match-form";
import Link from "next/link";
import { MatchDayParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match-day.params";

const NewMatchPage = async ({
  params: { matchDayId, roundId },
}: MatchDayParams) => {
  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href={`/admin/rounds/${roundId}/matchDays/${matchDayId}`}
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to match days
        </Link>
        <h1 className="inline-block">New Match</h1>
      </div>

      <MatchForm matchDayId={matchDayId} roundId={roundId} />
    </div>
  );
};

export default NewMatchPage;
