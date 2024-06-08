import dayjs from "dayjs";

const formatDate = (dateString: string) => {
  const date = dayjs(dateString);
  return date.isSame(dayjs(), "day")
    ? `Today ${date.format("HH:mm")}`
    : date.format("YYYY-MM-DD HH:mm");
};

export const InfoTile = ({ myPoints, myPlace, stopBetTime }: any) => {
  const placeColor = () => {
    if (myPlace === 1) return "text-yellow-400";
    if (myPlace === 2) return "text-gray-200";
    if (myPlace === 3) return "text-yellow-600";
    return "text-slate-400";
  };

  return (
    <div className="relative w-full overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px]  shadow-gray-600">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="text-md px-6 py-3 text-center font-bold">
              Ranking
            </th>
            <th scope="col" className="text-md px-6 py-3 text-center font-bold">
              Points
            </th>
            <th scope="col" className="px-6 py-3 text-center font-bold">
              Stop Bet Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={`border-b bg-white dark:border-gray-700 dark:bg-gray-800`}
          >
            <td className={`px-6 py-4 text-center font-bold ${placeColor()}`}>
              {myPlace}
            </td>
            <th
              scope="row"
              className={`flex items-center justify-center gap-3 whitespace-nowrap px-6 py-4 font-bold`}
            >
              {myPoints.toFixed(2)}
            </th>
            <td className={`px-6 py-4 text-center font-bold`}>
              {formatDate(stopBetTime)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
