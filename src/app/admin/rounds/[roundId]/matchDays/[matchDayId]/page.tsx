import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getMatches } from "@/lib/actions/match";
import { Results } from "@/components/results/results";
import { getMatchDays } from "@/lib/actions/matchDays";
import Link from "next/link";

const EditMatchDayPage = async ({ params }: Params) => {
  const matchDays = await getMatchDays(params.roundId);
  const matches = await getMatches(params.matchDayId);

  const matchDayNumber = matchDays.find(
    (matchDay) => matchDay.id === params.matchDayId,
  )?.dayNumber;

  const header = `Match Day ${matchDayNumber}`;

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
      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto sm:rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">Matches</h5>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <Link
                href={`/admin/rounds/${params.roundId}/matchDays/${params.matchDayId}/match/new`}
              >
                Add new match
              </Link>
            </button>
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
