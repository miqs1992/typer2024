import FlagIcon from "@/components/flagIcon/flag-icon";
import Link from "next/link";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";
import { displayDateTime } from "@/tools/time-helpers";

export const Results = ({
  matches,
  roundId,
  matchDayId,
}: {
  matches: PersistedMatch[];
  roundId: string;
  matchDayId: string;
}) => {
  return (
    <div className="relative w-full overflow-x-auto rounded-lg rounded-t-none shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="text-md px-6 py-3 text-center font-bold"
            ></th>
            <th scope="col" className="px-6 py-3 text-center">
              Result
            </th>
            <th scope="col" className="px-6 py-3 text-center"></th>
            <th scope="col" className="px-6 py-3 text-center">
              Start time
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {matches
            .sort(
              (a, b) =>
                new Date(b.start).getTime() - new Date(a.start).getTime(),
            )
            .map(
              ({
                firstTeam,
                secondTeam,
                id: matchId,
                firstTeamScore,
                secondTeamScore,
                start,
              }) => (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={firstTeam.name}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {firstTeam.name}
                      <FlagIcon country={firstTeam.flag} />
                    </div>
                  </td>
                  <td
                    scope="row flex"
                    className="flex h-full items-center justify-center gap-2 whitespace-nowrap px-6 py-4"
                  >
                    {`${firstTeamScore ?? "?"} - ${secondTeamScore ?? "?"}`}
                  </td>
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <FlagIcon country={secondTeam.flag} />
                      {secondTeam.name}
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-center"
                  >
                    {displayDateTime(start)}
                  </td>
                  <td
                    scope="row"
                    className="flex items-center justify-center gap-3 whitespace-nowrap px-6 py-4"
                  >
                    <Link
                      href={`/admin/rounds/${roundId}/matchDays/${matchDayId}/match/${matchId}/edit`}
                    >
                      Edit details
                    </Link>
                    <Link
                      href={`/admin/rounds/${roundId}/matchDays/${matchDayId}/match/${matchId}`}
                    >
                      Set Result
                    </Link>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
    </div>
  );
};
