import { getMatchDays } from "@/lib/actions/matchDays";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getRound } from "@/lib/actions/rounds";
import Link from "next/link";

const RoundPage = async ({ params }: Params) => {
  const round = await getRound(params.roundId);
  const matchDays = await getMatchDays(params.roundId);

  return (
    <div>
      <Link href={`/admin/rounds/${params.roundId}/matchDays/new`}>
        Add new match day
      </Link>
      <h1>{round.name}</h1>

      <div className="relative overflow-x-auto">
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
                <td className="px-6 py-4">
                  <Link href={`/admin/rounds/${round.id}/edit`}>Edit</Link>
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
