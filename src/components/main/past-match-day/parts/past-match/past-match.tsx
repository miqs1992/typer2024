import FlagIcon from "@/components/flagIcon/flag-icon";
import { getAllBetsForMatch } from "@/lib/actions/bet";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";

export const PastMatch = async ({ match }: { match: PersistedMatch }) => {
  const bets = await getAllBetsForMatch(match?.id);

  return (
    <div className="relative my-[50px] mb-12 mt-0 w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="text-md text-center font-bold"
              colSpan={2}
              style={{ width: "50%" }}
            ></th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-[14px] font-bold"
            >
              <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                <FlagIcon country={match?.firstTeam?.flag} />
                {`${match?.firstTeamScore} - ${match?.secondTeamScore}`}
                <FlagIcon country={match?.secondTeam?.flag} />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              P.
            </th>
          </tr>
        </thead>
        <tbody>
          {bets
            .sort((a, b) => a?.user?.username.localeCompare(b?.user?.username))
            .map((bet) => {
              const wonBet = bet?.points > 0;
              const isExactBet = bet?.isExact;
              return (
                <tr
                  className="border-b bg-white text-center dark:border-gray-700 dark:bg-gray-800"
                  key={bet._id}
                >
                  <th
                    scope="row"
                    className={`whitespace-nowrap font-bold ${wonBet ? "text-green-500" : ""}`}
                    colSpan={2}
                    style={{ width: "50%" }}
                  >
                    {bet?.user?.username}
                  </th>
                  <td
                    className={`flex items-center justify-center whitespace-nowrap px-6 py-4 font-bold ${isExactBet ? "text-yellow-500" : ""}`}
                  >
                    <p
                      className={`${bet?.result?.bonus ? "ml-[10px]" : "ml-[1px]"}`}
                    >
                      {bet?.result?.firstTeamResult} -{" "}
                      {bet?.result?.secondTeamResult}
                      {bet?.result?.bonus ? " *" : ""}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-bold">
                    {bet?.points?.toFixed(2)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
