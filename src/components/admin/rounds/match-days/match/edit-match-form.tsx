"use client";

import { editMatch } from "@/lib/actions/match";
import { IMatch } from "@/lib/models/match";
import { useFormState } from "react-dom";
import Form from "../../../../form/form";

interface FormProps {
  match: IMatch & { _id: string };
  matchDayId: string;
  roundId: string;
}

export const EditMatchForm = ({ match, matchDayId, roundId }: FormProps) => {
  const [state, formAction] = useFormState(editMatch, undefined);

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
      <input type="hidden" name="id" value={match._id} />
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
