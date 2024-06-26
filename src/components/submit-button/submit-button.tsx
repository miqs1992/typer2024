"use client";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import loadingIndicatorIcon from "./loading-indicator.svg";
import checkIcon from "./check.svg";
import crossIcon from "./cross.svg";

export const SubmitButton = ({
  text = "Save",
  loadingText = "Saving...",
  fullWidth = false,
  isSuccess = false,
  isFailure = false,
}: {
  text?: string;
  loadingText?: string;
  fullWidth?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
}) => {
  const status = useFormStatus();

  return (
    <button
      type="submit"
      disabled={status.pending || isSuccess}
      className={`flex ${fullWidth ? "w-full" : ""} items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ${status.pending ? "cursor-not-allowed dark:bg-primary-800" : ""} ${isSuccess ? "bg-green-600 dark:bg-green-600" : ""} ${isFailure ? "bg-red-600 dark:bg-red-600" : ""} ${!status.pending && !isSuccess && !isFailure ? "dark:bg-primary-600 dark:lg:hover:bg-primary-700 dark:lg:focus:ring-primary-800" : ""}`}
    >
      {status.pending ? (
        <Image
          src={loadingIndicatorIcon}
          width={14}
          height={14}
          alt="loading"
          className="mr-[8px] inline h-4 w-4 animate-spin text-white"
        />
      ) : null}
      {isSuccess ? (
        <Image
          src={checkIcon}
          width={14}
          height={14}
          alt="success"
          className="mr-[7px]"
        />
      ) : null}
      {isFailure ? (
        <Image
          src={crossIcon}
          width={14}
          height={14}
          alt="failure"
          className="mr-[7px]"
        />
      ) : null}

      {status.pending && loadingText}
      {isSuccess && "Saved"}
      {isFailure && "Failed"}
      {!status.pending && !isSuccess && !isFailure && text}
    </button>
  );
};
