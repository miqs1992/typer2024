import FlagIcon from "@/components/flagIcon/flagIcon";
import { COUNTRIES_MAPPER } from "@/constants/countries-mapper";

interface TopScorer {
  name: string;
  country: string;
}

interface RankingData {
  name: string;
  points: number;
  exactBets: number;
  winner: string;
  topScorer: TopScorer;
}

export const Ranking = ({
  rankingData,
  showExtended = true,
}: {
  rankingData: RankingData[];
  showExtended?: boolean;
}) => {
  if (!showExtended) {
    rankingData = rankingData.slice(0, 5);
  }

  return (
    <div className="relative w-full overflow-x-auto shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600  sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="text-md px-6 py-3 font-bold">
              Rank
            </th>
            <th scope="col" className="text-md px-6 py-3 font-bold">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Points
            </th>
            <th scope="col" className="px-6 py-3">
              Exact bets
            </th>
            <th scope="col" className="px-6 py-3">
              Top Scorer
            </th>
            <th scope="col" className="px-6 py-3">
              Winner
            </th>
          </tr>
        </thead>
        <tbody>
          {rankingData
            .sort((a, b) => b.points - a.points)
            .map(({ name, points, exactBets, topScorer, winner }, index) => {
              const textColor = () => {
                if (index === 0) return "text-yellow-400";
                if (index === 1) return "text-gray-200";
                if (index === 2) return "text-yellow-600";
                return "text-slate-400";
              };

              return (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={name}
                >
                  <th
                    scope="row"
                    className={`font-bol whitespace-nowrap px-6 py-4 ${textColor()}`}
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className={`font-bol whitespace-nowrap px-6 py-4 ${textColor()}`}
                  >
                    {name}
                  </th>
                  <td className={`px-6 py-4 ${textColor()}`}>{points}</td>
                  <td className={`px-6 py-4 ${textColor()}`}>{exactBets}</td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      <FlagIcon country={topScorer.country} />
                      <span className="ml-[7px] block  text-slate-300">
                        {topScorer.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="flex">
                      <FlagIcon country={winner} />
                      <span className="ml-[7px] block">
                        {
                          COUNTRIES_MAPPER[
                            winner as keyof typeof COUNTRIES_MAPPER
                          ]
                        }
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
