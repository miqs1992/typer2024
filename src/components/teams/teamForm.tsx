"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ITeam } from "@/lib/models/team";
import { createTeam, editTeam } from "@/lib/actions/teams";

interface FormProps {
  team?: ITeam;
}

const TeamForm = ({ team }: FormProps) => {
  const router = useRouter();
  const action = team ? editTeam : createTeam;
  const [creationState, creationAction] = useFormState(action, undefined);
  const [formTeam, setFormTeam] = useState(
    team || {
      name: "",
      flag: "",
      winner: false,
    },
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleWinnerChange = () => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        winner: !prevState.winner,
      };
    });
  };

  useEffect(() => {
    creationState?.success && router.push("/admin/teams");
  }, [creationState?.success, router]);

  return (
    <form className="mx-auto max-w-sm" action={creationAction}>
      {creationState?.error && (
        <p className="text-xs italic text-red-500">{creationState.error}</p>
      )}
      {team && <input type="hidden" name="id" value={team.id} />}
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
          value={formTeam.name}
          onChange={handleFormChange}
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="flag"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Flag
        </label>
        <input
          type="text"
          name="flag"
          id="flag"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="flag"
          value={formTeam.flag}
          onChange={handleFormChange}
          required
        />
      </div>
      {team && (
        <label className="mb-5 inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={formTeam.winner}
            value={formTeam.winner ? 1 : 0}
            name="winner"
            className="peer sr-only"
            readOnly
          />
          <div
            className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
            onClick={handleWinnerChange}
          ></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Winner
          </span>
        </label>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {team ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TeamForm;
