import { IMatch } from "@/lib/models/match";
import FlagIcon from "../flagIcon/flagIcon";

export const Results = ({ matches }: { matches: IMatch[] }) => {
  return (
    <div className="relative max-w-[450px] overflow-x-auto shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600  sm:rounded-lg">
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
          </tr>
        </thead>
        <tbody>
          {matches
            .sort(
              (a, b) =>
                new Date(b.start).getTime() - new Date(a.start).getTime(),
            )
            .map((match, index) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <td scope="row" className=" whitespace-nowrap px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {match.firstTeam.name}
                    <FlagIcon country={match.firstTeam.flag} />
                  </div>
                </td>
                <td
                  scope="row"
                  className="align-center flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4"
                >
                  <input
                    type="number"
                    id="firstTeamFinalResult"
                    aria-describedby="helper-text-explanation"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                    required
                  />
                  <input
                    type="number"
                    id="secondTeamFinalResult"
                    aria-describedby="helper-text-explanation"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                    required
                  />
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4
              "
                >
                  <div className="flex items-center justify-center gap-2">
                    <FlagIcon country={match.secondTeam.flag} />
                    {match.secondTeam.name}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
