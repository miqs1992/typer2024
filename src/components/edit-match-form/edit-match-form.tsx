"use client";

import { createMatch, editMatch } from "@/lib/actions/match";
import { IMatch } from "@/lib/models/match";
import { ITeam } from "@/lib/models/team";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface FormProps {
  match: IMatch;
}

export const EditMatchForm = ({ match }: FormProps) => {
  const [state, formAction] = useFormState(editMatch, undefined);

  return (
    <>
      <h2 className="text-center text-2xl font-bold text-white">Edit match</h2>
      <form className="mx-auto max-w-sm" action={formAction}>
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          ></input>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save
        </button>
      </form>
    </>
  );
};
