"use client";

import FlagIcon from "@/components/flagIcon/flag-icon";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NameAndFlag } from "../ranking/ranking";

export interface TopScorers {
  name: string;
  team: NameAndFlag;
  goals: number;
  assists: number;
}

export const TopScorers = ({
  topScorersData,
}: {
  topScorersData: TopScorers[];
}) => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <h3 className="mb-10 text-center text-3xl font-bold text-white">
        Top Scorers
      </h3>
      <div className="relative w-full max-w-[600px] overflow-x-auto rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px]  shadow-gray-600">
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
                {isMobile ? "G." : "Goals"}
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                {isMobile ? "A." : "Assists"}
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
                    <td className={`px-6 py-4 ${textColor()} text-center`}>
                      {index + 1}
                    </td>
                    <th
                      scope="row"
                      className={`flex gap-3 whitespace-nowrap px-6 py-4 font-bold ${textColor()} items-center justify-center`}
                    >
                      {<FlagIcon country={team.flag} />} {name}
                    </th>
                    <td className={`px-6 py-4 ${textColor()} text-center`}>
                      {goals}
                    </td>
                    <td className={`px-6 py-4 ${textColor()} text-center`}>
                      {assists}
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
