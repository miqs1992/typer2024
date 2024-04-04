"use client";

import {useFormState} from "react-dom";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {createRound, editRound} from "@/lib/actions/rounds";
import {IRound} from "@/lib/models/round";

interface FormProps {
  round?: IRound
}

const RoundForm = ({round}: FormProps) => {
  const router = useRouter();
  const action = round ? editRound : createRound;
  const [state, formAction] = useFormState(action, undefined);
  const [formRound, setFromRound] = useState(round || {
    name: "",
    order: "",
    stage: "",
    scoreFactor: ""
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromRound((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  };


  useEffect(() => {
    state?.success && router.push("/admin/rounds");
  }, [state?.success, router]);

  return (
    <form className="max-w-sm mx-auto" action={formAction}>
      {state?.error && <p className="text-red-500 text-xs italic">{state.error}</p>}
      {round && <input type="hidden" name="id" value={round.id}/>}
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
               value={formRound.name}
               onChange={handleFormChange}
               required/>
      </div>
      <div className="mb-5">
        <label htmlFor="order"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Order
        </label>
        <input type="number"
               name="order"
               id="order"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="1"
               step="1"
               min="0"
               max="10"
               value={formRound.order}
               onChange={handleFormChange}
               required/>
      </div>
      <div className="mb-5">
        <label htmlFor="stage"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Stage
        </label>
        <input type="number"
               name="stage"
               id="stage"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="1"
               step="1"
               min="0"
               max="10"
               value={formRound.stage}
               onChange={handleFormChange}
               required/>
      </div>
      <div className="mb-5">
        <label htmlFor="scoreFactor"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Factor
        </label>
        <input type="number"
               name="scoreFactor"
               id="scoreFactor"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="1"
               step="0.1"
               min="1"
               max="3"
               value={formRound.scoreFactor}
               onChange={handleFormChange}
               required/>
      </div>
      <button type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        {round ? "Update" : "Create"}
      </button>
    </form>
  )
}

export default RoundForm;
