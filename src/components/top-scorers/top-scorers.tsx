import FlagIcon from "@/components/flagIcon/flagIcon";

interface TopScorers {
  name: string;
  team: string;
  goals: number;
  assists: number;
}

export const TopScorers = ({
  topScorersData,
}: {
  topScorersData: TopScorers[];
}) => {
  return (
    <div className="relative w-full max-w-[600px] overflow-x-auto shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600  sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="text-md px-6 py-3 font-bold">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Team
            </th>
            <th scope="col" className="px-6 py-3">
              G.
            </th>
            <th scope="col" className="px-6 py-3">
              A.
            </th>
          </tr>
        </thead>
        <tbody>
          {topScorersData
            .sort((a, b) => b.goals - a.goals)
            .map(({ name, team, goals, assists }, index) => {
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
                    className={`whitespace-nowrap px-6 py-4 font-bold ${textColor()}`}
                  >
                    {name}
                  </th>
                  <td className={`px-6 py-4 ${textColor()}`}>
                    {<FlagIcon country={team} />}
                  </td>
                  <td className={`px-6 py-4 ${textColor()}`}>{goals}</td>
                  <td className={`px-6 py-4 ${textColor()}`}>{assists}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
