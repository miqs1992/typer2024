"use client";

import { IPlayer } from "@/lib/models/player";
import { useRouter } from "next/navigation";
import { createPlayer, editPlayer } from "@/lib/actions/players";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

interface PlayerFormProps {
  teamId: string;
  player?: IPlayer;
}

const PlayerForm = ({ player, teamId }: PlayerFormProps) => {
  const router = useRouter();
  const action = player ? editPlayer : createPlayer;
  const [state, formAction] = useFormState(action, undefined);
  const [formPlayer, setFromPlayer] = useState(
    player || {
      name: "",
      goals: 0,
      assists: 0,
    },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromPlayer((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    state?.success && router.push(`/admin/teams/${teamId}`);
  }, [state?.success, router]);

  return (
    <form className="mx-auto max-w-sm" action={formAction}>
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      {player && <input type="hidden" name="id" value={player.id} />}
      <input type="hidden" name="teamId" value={teamId} />
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
          value={formPlayer.name}
          onChange={handleFormChange}
          required
        />
      </div>
      {player && (
        <>
          <div className="mb-5">
            <label
              htmlFor="goals"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Goals
            </label>
            <input
              type="number"
              name="goals"
              id="goals"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="1"
              step="1"
              min="0"
              max="20"
              value={formPlayer.goals}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="goals"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Assists
            </label>
            <input
              type="number"
              name="assists"
              id="assists"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="1"
              step="1"
              min="0"
              max="20"
              value={formPlayer.assists}
              onChange={handleFormChange}
              required
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {player ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default PlayerForm;
