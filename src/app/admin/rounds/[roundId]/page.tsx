import Link from "next/link";
import { getRound } from "@/modules/admin/round-match-management/round.actions";
import {
  getMatchDaysInRound,
  removeMatchDay,
} from "@/modules/admin/round-match-management/match-day.actions";
import { RoundParams } from "@/app/admin/rounds/[roundId]/round.params";

const RoundPage = async ({ params }: RoundParams) => {
  const round = await getRound(params.roundId);
  const matchDays = await getMatchDaysInRound(params.roundId);

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Rounds
        </Link>
        <h1 className="inline-block">{round.name}</h1>
      </div>

      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">Match Days</h5>
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
              <Link href={`/admin/rounds/${params.roundId}/matchDays/new`}>
                Add new Match Day
              </Link>
            </button>
          </div>
        </div>
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Stop Bet Time
              </th>
              <th scope="col" className="px-6 py-3">
                Match count
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {matchDays.map((day) => (
              <tr
                key={day.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <Link href={`/admin/rounds/${round.id}/matchDays/${day.id}`}>
                    {day.dayNumber}
                  </Link>
                </th>
                <td className="px-6 py-4">{day.stopBetTime.toISOString()}</td>
                <td className="px-6 py-4">TBD</td>
                <td className="flex gap-2 px-6 py-4">
                  <Link
                    href={`/admin/rounds/${round.id}/matchDays/${day.id}/edit`}
                  >
                    Edit
                  </Link>
                  <form action={removeMatchDay}>
                    <input type="hidden" name="id" value={day.id} />
                    <input type="hidden" name="roundId" value={round.id} />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoundPage;
