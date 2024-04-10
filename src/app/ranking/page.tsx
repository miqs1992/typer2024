import FlagIcon from "@/components/flagIcon/flagIcon";
import { COUNTRIES_MAPPER } from "@/constants/countries-mapper";

const Ranking = async () => {
  const mockedData = [
    {
      name: "Wojtałke",
      points: 2137,
      exactBets: 50,
      topScorer: {
        name: "Giovanni Paolo",
        country: "va",
      },
      winner: "va",
    },
    {
      name: "Kamil Kusy",
      points: 0,
      exactBets: 0,
      topScorer: {
        name: "Tymoteusz Puchacz",
        country: "pl",
      },
      winner: "pl",
    },
    {
      name: "Andrzej",
      points: 13,
      exactBets: 3,
      topScorer: {
        name: "Harry Kane",
        country: "gb-eng",
      },
      winner: "fr",
    },
    {
      name: "Maciek",
      points: 32,
      exactBets: 4,
      topScorer: {
        name: "Ronaldinho",
        country: "ua",
      },
      winner: "pl",
    },
    {
      name: "Jola",
      points: 30,
      exactBets: 4,
      topScorer: {
        name: "Olisadebe",
        country: "pl",
      },
      winner: "sk",
    },
  ];

  return (
    <>
      <h1 className="my-10 text-center text-3xl font-bold text-white">
        Current ranking
      </h1>
      <div className="relative w-full overflow-x-auto shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600  sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold text-md">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Points
              </th>
              <th scope="col" className="px-6 py-3">
                Exact bets
              </th>
              <th scope="col" className="px-6 py-3">
                Top scorer
              </th>
              <th scope="col" className="px-6 py-3">
                Winner
              </th>
            </tr>
          </thead>
          <tbody>
            {mockedData
              .sort((a, b) => b.points - a.points)
              .map(({ name, points, exactBets, topScorer, winner }, index) => {
                const textColor = () => {
                  if (index === 0) return "text-yellow-400";
                  if (index === 1) return "text-gray-300";
                  if (index === 2) return "text-yellow-600";
                  return "text-white";
                };

                return (
                  <tr
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={name}
                  >
                    <th
                      scope="row"
                      className={`whitespace-nowrap px-6 py-4 font-bold text-gray-900 ${textColor()}`}
                    >
                      {name}
                    </th>
                    <td className={`px-6 py-4 ${textColor()}`}>{points}</td>
                    <td className={`px-6 py-4 ${textColor()}`}>{exactBets}</td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <FlagIcon country={topScorer.country} />
                        <span className="ml-[7px] block">{topScorer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
    </>
  );
};

export default Ranking;
