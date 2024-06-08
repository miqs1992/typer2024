"use client";

import FlagIcon from "@/components/flagIcon/flag-icon";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../../submit-button/submit-button";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Tooltip } from "@/components/tooltip/tooltip";
import Image from "next/image";
import checkboxIcon from "./check.svg";
import { PersistedBet } from "@/modules/betting/betting.service";
import { updateMyBets } from "@/modules/betting/betting.actions";

interface FormBet {
  id: string;
  firstTeamResult: number;
  secondTeamResult: number;
  bonus: boolean;
}

export const MyFutureMatchDay = ({
  matchDayNumber,
  bets,
  disabledBonus = false,
  hideHeading = false,
}: {
  matchDayNumber?: number;
  bets: PersistedBet[];
  disabledBonus?: boolean;
  hideHeading?: boolean;
}) => {
  const headingLabel = `Match Day ${matchDayNumber}`;
  const [state, formAction] = useFormState(updateMyBets, undefined);
  const [statusMessage, setStatusMessage] = useState<string | undefined>("");

  const [betList, setBetList] = useState<FormBet[]>(
    bets.map((bet) => ({
      id: bet.id,
      firstTeamResult: bet.result.firstTeamResult,
      secondTeamResult: bet.result.secondTeamResult,
      bonus: bet.result.bonus,
    })),
  );

  useEffect(() => {
    setStatusMessage(state?.message);
    const timeout = setTimeout(() => {
      setStatusMessage("");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [state]);

  const onResultInputChange = (
    value: string | "",
    index: number,
    team: "firstTeam" | "secondTeam",
  ) => {
    const inputVal = value ? Number(value) : "";
    setBetList((prevBetList: any) => {
      const newBetList = [...prevBetList];
      const bet = { ...newBetList[index] };
      bet[`${team}Result`] = inputVal;
      newBetList[index] = bet;
      return newBetList;
    });
  };

  const onBonusInputChange = (index: number) => {
    setBetList((prevBetList: any) => {
      const bet = { ...prevBetList[index] };
      const newBetList = prevBetList.map((bet: any) => ({
        ...bet,
        bonus: false,
      }));
      bet.bonus = !bet.bonus;
      newBetList[index] = bet;
      return newBetList;
    });
  };

  const getPersistedBet = (id: string): PersistedBet => {
    return bets.find((bet) => bet.id === id)!;
  };

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
              <th
                scope="col"
                className="text-md px-6 py-3 text-center font-bold"
              ></th>
              <th scope="col" className="px-6 py-3 text-center">
                Result
              </th>
              <th scope="col" className="px-6 py-3 text-center"></th>
              <th
                scope="col"
                className="text-md px-6 py-3 text-center font-bold"
              >
                Bonus
              </th>
            </tr>
          </thead>
          <tbody>
            {betList.map((formBet: FormBet, index: number) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <td
                  scope="row"
                  className="whitespace-nowrap px-4 py-2 lg:px-6 lg:py-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    {getPersistedBet(formBet.id).match.firstTeam.name}
                    <FlagIcon
                      country={getPersistedBet(formBet.id).match.firstTeam.flag}
                    />
                  </div>
                </td>
                <td
                  scope="row flex"
                  className="flex h-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2 lg:px-6 lg:py-4"
                >
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="flex items-center justify-center">
                      <input
                        value={formBet.firstTeamResult}
                        type="number"
                        maxLength={2}
                        data-focus-input-init
                        data-focus-input-next="code-2"
                        id="code-1"
                        className={`block h-9 w-9 rounded-lg border-2 border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 [&::-webkit-inner-spin-button]:appearance-none`}
                        required
                        onFocus={() =>
                          onResultInputChange("", index, "firstTeam")
                        }
                        onChange={(v) =>
                          onResultInputChange(
                            v.target.value,
                            index,
                            "firstTeam",
                          )
                        }
                      />
                    </div>
                    <span className="relative top-[8px]">-</span>
                    <div>
                      <input
                        value={formBet.secondTeamResult}
                        type="number"
                        maxLength={2}
                        data-focus-input-init
                        data-focus-input-prev="code-1"
                        data-focus-input-next="code-3"
                        id="code-2"
                        className={`block h-9 w-9  rounded-lg border-2 border-gray-300 bg-white py-3 text-center text-sm font-extrabold text-gray-900 outline-none focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 [&::-webkit-inner-spin-button]:appearance-none`}
                        required
                        onFocus={() =>
                          onResultInputChange("", index, "secondTeam")
                        }
                        onChange={(v) =>
                          onResultInputChange(
                            v.target.value,
                            index,
                            "secondTeam",
                          )
                        }
                      />
                    </div>
                  </div>
                </td>
                <td
                  scope="row"
                  className="whitespace-nowrap px-4 py-2 lg:px-6 lg:py-4"
                >
                  <div className="flex items-center justify-center gap-2">
                    <FlagIcon
                      country={
                        getPersistedBet(formBet.id).match.secondTeam.flag
                      }
                    />
                    {getPersistedBet(formBet.id).match.secondTeam.name}
                  </div>
                </td>

                <td
                  scope="row"
                  className="flex items-center justify-center whitespace-nowrap px-4 py-2 font-bold lg:px-6 lg:py-4"
                >
                  <Tooltip
                    text="You have already used the bonus in this round."
                    hideTooltip={!disabledBonus}
                  >
                    <Checkbox.Root
                      className={`relative top-[2px] h-[20px] w-[20px] rounded border-2 border-gray-500 bg-gray-600 ${disabledBonus ? "cursor-not-allowed" : "cursor-pointer"}`}
                      checked={formBet.bonus}
                      disabled={disabledBonus}
                      onCheckedChange={() => onBonusInputChange(index)}
                    >
                      <Checkbox.Indicator>
                        <Image
                          src={checkboxIcon}
                          alt="checkbox"
                          width={20}
                          height={20}
                        />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form
          action={formAction}
          className="flex flex-row items-center justify-between p-4 lg:justify-end dark:bg-gray-800"
        >
          <SubmitButton isSuccess={!!statusMessage} />
          <div></div>
          <input type="hidden" name="betList" value={JSON.stringify(betList)} />
          <input type="hidden" name="matchDayId" value={bets[0].matchDayId} />
        </form>
      </div>
    </>
  );
};
