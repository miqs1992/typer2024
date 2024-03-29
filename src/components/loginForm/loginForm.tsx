"use client";

import { useFormState } from "react-dom";
import { handleLogin } from "@/lib/actions/session";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(handleLogin, undefined);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {state?.error && <p className="text-red-500 text-xs italic">{state.error}</p>}
      <div>
        <label htmlFor="email"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input type="email"
               name="email"
               id="email"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="email@google.com"
               required/>
      </div>
      <div>
        <label htmlFor="password"
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input type="password"
               name="password"
               id="password"
               placeholder="••••••••"
               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required/>
      </div>
      <button type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Login
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <Link href="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-1">
          Register
        </Link>
      </p>
    </form>
  )
}

export default LoginForm;
