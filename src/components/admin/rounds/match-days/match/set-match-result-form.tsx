"use client";

import { useFormState } from "react-dom";
import Form from "@/components/form/form";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";
import { setMatchResult } from "@/modules/admin/round-match-management/match.actions";

interface FormProps {
  match: PersistedMatch;
  matchDayId: string;
  roundId: string;
}

export const SetMatchResultForm = ({
  match,
  matchDayId,
  roundId,
}: FormProps) => {
  const [state, formAction] = useFormState(setMatchResult, undefined);

  return (
    <Form
      state={state}
      formAction={formAction}
      update
      successRoute={`/admin/rounds/${roundId}/matchDays/${matchDayId}`}
      fullWidthSubmitButton
    >
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      <input type="hidden" name="id" value={match.id} />
      <input type="hidden" name="roundId" value={roundId} />
      <div className="mb-5">
        <label
          htmlFor="firstTeam"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {match.firstTeam.name}
        </label>
        <input
          id="firstTeamResult"
          name="firstTeamResult"
          className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></input>
      </div>
      <div className="mb-5">
        <label
          htmlFor="firstTeam"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {match.secondTeam.name}
        </label>
        <input
          id="secondTeamResult"
          name="secondTeamResult"
          className="block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></input>
      </div>
    </Form>
  );
};
