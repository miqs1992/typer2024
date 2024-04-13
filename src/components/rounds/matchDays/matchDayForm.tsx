"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createMatchDay } from "@/lib/actions/matchDays";

interface FormProps {
  roundId: string;
}

const MatchDayForm = ({ roundId }: FormProps) => {
  const router = useRouter();
  const [state, formAction] = useFormState(createMatchDay, undefined);

  useEffect(() => {
    state?.success && router.push(`/admin/rounds/${roundId}`);
  }, [state?.success, router]);

  return (
    <form className="mx-auto max-w-sm" action={formAction}>
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      {<input type="hidden" name="roundId" value={roundId} />}

      <div className="mb-5">
        <label
          htmlFor="dayNumber"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Day Number
        </label>
        <input
          type="number"
          name="dayNumber"
          id="dayNumber"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          step="1"
          min="0"
          max="20"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="stopBetTime"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Stop Bet Time
        </label>
        <input
          type="datetime-local"
          name="stopBetTime"
          id="stopBetTime"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create
      </button>
    </form>
  );
};

export default MatchDayForm;
