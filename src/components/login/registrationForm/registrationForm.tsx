"use client";

import { useFormState } from "react-dom";
import { handleRegistration } from "@/lib/actions/session";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitButton } from "@/components/submit-button/submit-button";

const RegistrationForm = () => {
  const [state, formAction] = useFormState(handleRegistration, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

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
          className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-2 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="email@google.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          User Name
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-2 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="name"
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
      <div>
        <label
          htmlFor="passwordConfirmation"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password Confirmation
        </label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-2 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <SubmitButton text="Register" loadingText="Loading..." fullWidth />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Do have an account already?
        <Link
          href="/login"
          className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
