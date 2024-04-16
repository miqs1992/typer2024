"use client";

import { RequestState } from "@/lib/actions/state";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormProps {
  state: RequestState | undefined;
  formAction: (payload: FormData) => void;
  children: ReactNode;
  successRoute: string;
  update?: boolean;
}

const Form = ({
  state,
  formAction,
  update,
  successRoute,
  children,
}: FormProps) => {
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push(successRoute);
  }, [state?.success, router, successRoute]);

  return (
    <form className="mx-auto max-w-sm" action={formAction}>
      {state?.error && (
        <p className="text-xs italic text-red-500">{state.error}</p>
      )}
      {children}
      <button
        type="submit"
        className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {update ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default Form;
