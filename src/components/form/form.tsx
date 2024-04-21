"use client";

import { RequestState } from "@/lib/actions/state";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submit-button/submit-button";

interface FormProps {
  state: RequestState | undefined;
  formAction: (payload: FormData) => void;
  children: ReactNode;
  successRoute: string;
  update?: boolean;
  fullWidthSubmitButton?: boolean;
}

const Form = ({
  state,
  formAction,
  update,
  successRoute,
  children,
  fullWidthSubmitButton,
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
      <SubmitButton
        text={update ? "Update" : "Create"}
        loadingText={update ? "Updating..." : "Creating..."}
        fullWidth={fullWidthSubmitButton}
      />
    </form>
  );
};

export default Form;
