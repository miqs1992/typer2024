"use client";

import {useFormState} from "react-dom";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {createMatchDay} from "@/lib/actions/matchDays";

interface FormProps {
  roundId: string
}

const MatchDayForm = ({roundId}: FormProps) => {
  const router = useRouter();
  const [state, formAction] = useFormState(createMatchDay, undefined);

  useEffect(() => {
    state?.success && router.push(`/admin/rounds/${roundId}`);
  }, [state?.success, router]);

  return (
    <form className="max-w-sm mx-auto" action={formAction}>
      {state?.error && <p className="text-red-500 text-xs italic">{state.error}</p>}
      {<input type="hidden" name="roundId" value={roundId}/>}

      <div className="mb-5">
        <label htmlFor="dayNumber"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Day Number
        </label>
        <input type="number"
               name="dayNumber"
               id="dayNumber"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="1"
               step="1"
               min="0"
               max="20"
               required/>
      </div>

      <div className="mb-5">
        <label htmlFor="stopBetTime"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Stop Bet Time
        </label>
        <input type="datetime-local"
               name="stopBetTime"
               id="stopBetTime"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required/>
      </div>
      <button type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Create
      </button>
    </form>
  )
}

export default MatchDayForm;
