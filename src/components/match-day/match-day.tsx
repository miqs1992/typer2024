"use client";

import FlagIcon from "../flagIcon/flagIcon";
import { useEffect, useState } from "react";
import { IBet } from "@/lib/models/bet";
import { updateBets } from "@/lib/actions/bet";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../submit-button/submit-button";
import { SuccessToast } from "../success-toast/success-toast";

export const MatchDay = ({
  previous,
  matchDayNumber,
  bets,
}: {
  previous?: boolean;
  matchDayNumber: number;
  bets: IBet[];
}) => {
  const headingLabel = `Match Day ${matchDayNumber}`;
  const [state, formAction] = useFormState(updateBets, undefined);
  const [statusMessage, setStatusMessage] = useState<string | undefined>("");

  const [betList, setBetList] = useState<any>(
    bets.map((bet) => ({
      betId: bet._id,
      match: {
        firstTeam: {
          result: bet.result.firstTeamResult,
          name: bet.match.firstTeam.name,
          flag: bet.match.firstTeam.flag,
        },
        secondTeam: {
          result: bet.result.secondTeamResult,
          name: bet.match.secondTeam.name,
          flag: bet.match.secondTeam.flag,
        },
        start: bet.match.start,
      },
      withBonus: false,
    })),
  );

  useEffect(() => {
    setStatusMessage(state?.message);
    const timeout = setTimeout(() => {
      setStatusMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [state]);

  const onInputChange = (
    value: string | "",
    index: number,
    team: "firstTeam" | "secondTeam",
  ) => {
    const inputVal = value ? Number(value) : "";
    setBetList((prevBetList: any) => {
      const newBetList = [...prevBetList];
      const bet = { ...newBetList[index] };
      bet.match[team].result = inputVal;
      newBetList[index] = bet;
      return newBetList;
    });
  };

  return (
    <div className="flex w-[50%] flex-col gap-10">
      {statusMessage ? <SuccessToast customMessage={statusMessage} /> : null}
      <div className="grow">
        <h3 className="text-center text-3xl font-bold text-white">
          {headingLabel}
        </h3>
      </div>
      <div className="relative w-full overflow-x-auto shadow-[rgba(0,_0,_0,_0.24)_0px_0px_8px] shadow-gray-600  sm:rounded-lg">
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
            {betList
              .sort(
                (a: any, b: any) =>
                  new Date(b.match.start).getTime() -
                  new Date(a.match.start).getTime(),
              )
              .map((bet: any, index: any) => (
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {bet.match.firstTeam.name}
                      <FlagIcon country={bet.match.firstTeam.flag} />
                    </div>
                  </td>
                  <td
                    scope="row flex"
                    className="flex h-full items-center justify-center gap-2 whitespace-nowrap px-6 py-4"
                  >
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <div className="flex items-center justify-center">
                        <input
                          value={bet.match.firstTeam.result}
                          type="number"
                          maxLength={2}
                          data-focus-input-init
                          data-focus-input-next="code-2"
                          id="code-1"
                          className="block h-9 w-9 rounded-lg border-2 border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 [&::-webkit-inner-spin-button]:appearance-none"
                          required
                          onFocus={(v) => onInputChange("", index, "firstTeam")}
                          onChange={(v) =>
                            onInputChange(v.target.value, index, "firstTeam")
                          }
                        />
                      </div>
                      <span className="relative top-[6px]">-</span>
                      <div>
                        <input
                          value={bet.match.secondTeam.result}
                          type="number"
                          maxLength={2}
                          data-focus-input-init
                          data-focus-input-prev="code-1"
                          data-focus-input-next="code-3"
                          id="code-2"
                          className="block h-9 w-9 rounded-lg border-2 border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 [&::-webkit-inner-spin-button]:appearance-none"
                          required
                          onFocus={(v) =>
                            onInputChange("", index, "secondTeam")
                          }
                          onChange={(v) =>
                            onInputChange(v.target.value, index, "secondTeam")
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td scope="row" className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <FlagIcon country={bet.match.secondTeam.flag} />
                      {bet.match.secondTeam.name}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form
          action={formAction}
          className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0 dark:bg-gray-800"
        >
          <div></div>
          <input type="hidden" name="betList" value={JSON.stringify(betList)} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
