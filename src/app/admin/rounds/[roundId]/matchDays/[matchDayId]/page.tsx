import { Results } from "@/components/admin/rounds/match-days/results";
import Link from "next/link";
import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";
import { MatchDayParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match-day.params";
import { getMatchesInDay } from "@/modules/admin/round-match-management/match.actions";
import { calculateDayResults } from "@/modules/admin/calculations/calculation.actions";

const EditMatchDayPage = async ({ params }: MatchDayParams) => {
  const matchDay = await getMatchDay(params.matchDayId);
  const matches = await getMatchesInDay(params.matchDayId);

  const header = `Match Day ${matchDay.dayNumber}`;

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href={`/admin/rounds/${params.roundId}`}
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Match Days
        </Link>
        <h1 className="inline-block">{header}</h1>
      </div>
      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">Matches</h5>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Link
                  href={`/admin/rounds/${params.roundId}/matchDays/${params.matchDayId}/match/new`}
                >
                  Add new match
                </Link>
              </button>
              <form action={calculateDayResults}>
                <input type="hidden" name="roundId" value={params.roundId} />
                <input
                  type="hidden"
                  name="matchDayId"
                  value={params.matchDayId}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Recalculate
                </button>
              </form>
            </div>
          </div>
        </div>
        <Results
          matches={matches}
          roundId={params.roundId}
          matchDayId={params.matchDayId}
        />
      </div>
    </div>
  );
};

export default EditMatchDayPage;
