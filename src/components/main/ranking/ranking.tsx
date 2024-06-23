import FlagIcon from "@/components/flagIcon/flag-icon";
import { RankedUserData } from "@/modules/ranking/ranking.service";

export const Ranking = ({
  rankingData,
  showExtended = true,
}: {
  rankingData: RankedUserData[];
  showExtended?: boolean;
}) => {
  if (!showExtended) {
    rankingData = rankingData.slice(0, 5);
  }

  return (
    <>
      <h3
        className={`mb-10 text-white ${showExtended ? "my-4 mb-12" : ""} text-center text-3xl font-bold`}
      >
        {showExtended ? "League ranking" : "Current Top 5"}
      </h3>
      <div className="relative w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px]  shadow-gray-600">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="text-md px-6 py-3 text-center font-bold"
              >
                No.
              </th>
              <th
                scope="col"
                className="text-md px-6 py-3 text-center font-bold"
              >
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Points
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Exact
              </th>
              {showExtended ? (
                <>
                  <th scope="col" className="px-6 py-3 text-center">
                    Top Scorer
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Winner
                  </th>
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rankingData.map(
              (
                { username, points, exactBetCount, topScorer, winner },
                index,
              ) => {
                const textColor = () => {
                  if (index === 0) return "text-yellow-400";
                  if (index === 1) return "text-gray-200";
                  if (index === 2) return "text-yellow-600";
                  return "text-slate-400";
                };

                return (
                  <tr
                    className="border-b bg-white text-center dark:border-gray-700 dark:bg-gray-800"
                    key={username}
                  >
                    <th
                      scope="row"
                      className={`font-bol whitespace-nowrap px-6 py-4 ${textColor()} text-center`}
                    >
                      {index + 1}
                    </th>
                    <th
                      scope="row"
                      className={`font-bol whitespace-nowrap px-6 py-4 ${textColor()} text-center`}
                    >
                      {username}
                    </th>
                    <td className={`px-6 py-4 ${textColor()} text-center`}>
                      {points.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 ${textColor()} text-center`}>
                      {exactBetCount}
                    </td>

                    {showExtended ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <FlagIcon country={topScorer?.team?.flag} />
                            <span className="ml-[7px] block  text-slate-300">
                              {topScorer?.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          <div className="flex justify-center">
                            <FlagIcon country={winner?.flag} />
                            <span className="ml-[7px] block">
                              {winner?.name}
                            </span>
                          </div>
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
