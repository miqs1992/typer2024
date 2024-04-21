"use client";

import { createMatch } from "@/lib/actions/match";
import { IMatch } from "@/lib/models/match";
import { ITeam } from "@/lib/models/team";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Form from "../form/form";

interface FormProps {
  match?: IMatch;
  teams: ITeam[];
  matchDayId: string;
  roundId: string;
}

export const MatchForm = ({ match, teams, matchDayId, roundId }: FormProps) => {
  const router = useRouter();
  const action = match ? createMatch : createMatch;
  const [state, formAction] = useFormState(action, undefined);

  useEffect(() => {
    state?.success &&
      router.push(`/admin/rounds/${roundId}/matchDays/${matchDayId}`);
  }, [state?.success, router, matchDayId, roundId]);

  return (
    <Form
      formAction={formAction}
      fullWidthSubmitButton
      state={state}
      successRoute={`/admin/rounds/${roundId}/matchDays/${matchDayId}`}
    >
      <input type="hidden" name="matchDay" value={matchDayId} />
      <div className="mb-5">
        <label
          htmlFor="firstTeam"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          First team
        </label>
        <select
          id="firstTeam"
          name="firstTeam"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {teams.map((team, i) => (
            <option key={i} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="secondTeam"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Second team
        </label>
        <select
          id="secondTeam"
          name="secondTeam"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {teams.map((team, i) => (
            <option key={i} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label
          htmlFor="start"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Start
        </label>
        <input
          type="datetime-local"
          name="start"
          id="start"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
    </Form>
  );
};
