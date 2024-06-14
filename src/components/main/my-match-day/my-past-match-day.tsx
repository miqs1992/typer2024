"use client";

import FlagIcon from "@/components/flagIcon/flag-icon";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PersistedBet } from "@/modules/betting/betting.service";
import { PublicMatchDay } from "@/modules/matches/match-day.service";
import { displayDate } from "@/tools/time-helpers";

export const MyPastMatchDay = ({
  matchDay,
  bets,
  hideHeading = false,
}: {
  matchDay: PublicMatchDay;
  bets: PersistedBet[];
  hideHeading?: boolean;
}) => {
  const { isMobile } = useMediaQuery();
  const headingLabel = `Match Day ${matchDay.dayNumber} - ${displayDate(matchDay.stopBetTime)}`;

  return (
    <>
      {!hideHeading ? (
        <div>
          <h3 className="mb-10 text-center text-3xl font-bold text-white">
            {headingLabel}
          </h3>
        </div>
      ) : null}
      <div className="relative grid w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Match
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Result
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Bet
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet: PersistedBet, index: number) => {
              const wonBet = bet.points > 0;
              const isExactBet = bet.isExact;

              const betFontColor = () => {
                if (isExactBet) {
                  return "text-yellow-500";
                }
                if (wonBet) {
                  return "text-green-500";
                }
                return "";
              };

              return (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-4 py-2 lg:px-6 lg:py-4"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isMobile ? null : bet.match.firstTeam.name}
                      <FlagIcon country={bet.match.firstTeam.flag} />
                      {" -"}
                      <FlagIcon country={bet.match.secondTeam.flag} />
                      {isMobile ? null : bet.match.secondTeam.name}
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-4 py-2 text-center lg:px-6 lg:py-4"
                  >
                    {bet.match.firstTeamResult} - {bet.match.secondTeamResult}
                  </td>
                  <td
                    scope="row"
                    className={`whitespace-nowrap px-4 py-2 text-center lg:px-6 lg:py-4 ${betFontColor()}`}
                  >
                    {bet.result.firstTeamResult} - {bet.result.secondTeamResult}
                    {bet.result.bonus ? " *" : ""}
                  </td>
                  <td
                    scope="row"
                    className="whitespace-nowrap px-4 py-2 text-center font-bold lg:px-6 lg:py-4"
                  >
                    {bet.points.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
