import { PersistedMatch, UserBet } from "@/modules/betting/betting.service";
import FlagIcon from "@/components/flagIcon/flag-icon";
import { getCurrentSession } from "@/modules/helpers/get-current-session";

export const MatchDayHistory = async ({
  matches,
  userBets,
}: {
  matches: PersistedMatch[];
  userBets: UserBet[];
}) => {
  const sortedMatches = matches.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );
  const sortedMatchIds = sortedMatches.map((match) => match.id);
  const sortedUserBets = userBets.sort((a, b) =>
    a.user.name.localeCompare(b.user.name),
  );
  const { user } = await getCurrentSession();

  return (
    <div className="relative my-[50px] mb-12 mt-0 max-h-svh w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="text-md text-center"
              style={{ width: "20%" }}
            ></th>

            {sortedMatches.map((match) => (
              <th
                scope="col"
                className="px-6 py-3 text-center text-[14px]"
                key={match.id}
                colSpan={2}
              >
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <span className="max-sm:hidden">{match.firstTeam.name}</span>
                  <FlagIcon country={match.firstTeam.flag} />
                  <b>
                    {`${match.firstTeamResult ?? "?"} - ${match.secondTeamResult ?? "?"}`}
                  </b>
                  <FlagIcon country={match.secondTeam?.flag} />
                  <span className="max-sm:hidden">{match.secondTeam.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {sortedUserBets.map((userBet) => (
            <tr
              className={`border-b bg-white text-center dark:border-gray-700 ${userBet.user.id === user.id ? "dark:bg-gray-600" : "dark:bg-gray-800"}`}
              key={userBet.user.id}
            >
              <th scope="row" className="px-2 font-bold">
                {userBet.user.name}
              </th>

              {sortedMatchIds.map((matchId) => {
                const bet = userBet.bets.find((bet) => bet.matchId === matchId);
                if (!bet)
                  return (
                    <td
                      className={`flex items-center justify-center whitespace-nowrap px-6 py-4 font-bold`}
                      colSpan={2}
                      key={`${userBet.user.id}-${matchId}-bet`}
                    >
                      <p>-</p>
                    </td>
                  );

                const emphasisClass = bet.isExact
                  ? bet.bonus
                    ? "text-red-500"
                    : "text-yellow-500"
                  : bet.points > 0
                    ? "text-green-500"
                    : "";

                return (
                  <>
                    <td
                      className={`whitespace-nowrap py-4 text-center font-bold ${emphasisClass}`}
                      key={`${bet.id}-bet`}
                    >
                      {bet.firstTeamResult} - {bet.secondTeamResult}{" "}
                      {bet.bonus && " *"}
                    </td>
                    <td
                      className={`px-2 py-4 text-center font-bold ${emphasisClass}`}
                      key={`${bet.id}-points`}
                    >
                      {bet.points.toFixed(2)}
                    </td>
                  </>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
