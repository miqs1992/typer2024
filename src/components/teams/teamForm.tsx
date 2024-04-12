"use client";

import {useFormState} from "react-dom";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {ITeam} from "@/lib/models/team";
import {createTeam, editTeam} from "@/lib/actions/teams";

interface FormProps {
  team?: ITeam;
}

const TeamForm = ({team}: FormProps) => {
  const router = useRouter();
  const action = team ? editTeam : createTeam;
  const [state, formAction] = useFormState(action, undefined);
  const [formTeam, setFormTeam] = useState(team || {
    name: "",
    flag: "",
    winner: false,
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleWinnerChange = () => {
    setFormTeam((prevState) => {
      return {
        ...prevState,
        winner: !prevState.winner
      }
    })
  }


  useEffect(() => {
    state?.success && router.push("/admin/teams");
  }, [state?.success, router]);

  return (
    <form className="max-w-sm mx-auto" action={formAction}>
      {state?.error && <p className="text-red-500 text-xs italic">{state.error}</p>}
      {team && <input type="hidden" name="id" value={team.id}/>}
      <div className="mb-5">
        <label htmlFor="name"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input type="text"
               name="name"
               id="name"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="name"
               value={formTeam.name}
               onChange={handleFormChange}
               required/>
      </div>
      <div className="mb-5">
        <label htmlFor="flag"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Flag
        </label>
        <input type="text"
               name="flag"
               id="flag"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="flag"
               value={formTeam.flag}
               onChange={handleFormChange}
               required/>
      </div>
      {team && (
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input type="checkbox" checked={formTeam.winner} value={formTeam.winner ? 1 : 0} name="winner" className="sr-only peer" readOnly/>
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            onClick={handleWinnerChange}
          ></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Winner</span>
        </label>
      )}

      <button type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        {team ? "Update" : "Create"}
      </button>
    </form>
  )
}

export default TeamForm;
