"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createRound, editRound } from "@/lib/actions/rounds";
import { IRound } from "@/lib/models/round";

interface FormProps {
  round?: IRound;
}

const RoundForm = ({ round }: FormProps) => {
  const router = useRouter();
  const action = round ? editRound : createRound;
  const [state, formAction] = useFormState(action, undefined);
  const [formRound, setFromRound] = useState(
    round || {
      name: "",
      order: "",
      stage: "",
      scoreFactor: "",
    },
  );
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromRound((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    state?.success && router.push("/admin/rounds");
  }, [state?.success, router]);

  return (
    <form className="mx-auto max-w-sm" action={formAction}>
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      {round && <input type="hidden" name="id" value={round.id} />}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="name"
          value={formRound.name}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="order"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Order
        </label>
        <input
          type="number"
          name="order"
          id="order"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          step="1"
          min="0"
          max="10"
          value={formRound.order}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="stage"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Stage
        </label>
        <input
          type="number"
          name="stage"
          id="stage"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          step="1"
          min="0"
          max="10"
          value={formRound.stage}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="scoreFactor"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Factor
        </label>
        <input
          type="number"
          name="scoreFactor"
          id="scoreFactor"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          step="0.1"
          min="1"
          max="3"
          value={formRound.scoreFactor}
          onChange={handleFormChange}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {round ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default RoundForm;
