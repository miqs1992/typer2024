"use client";

import { useFormState } from "react-dom";
import { handleLogin } from "@/lib/actions/session";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(handleLogin, undefined);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-2 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder=""
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-2 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Login
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <Link
          href="/register"
          className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
