"use client";

import { useRef } from "react";

export const SuccessToast = ({ customMessage }: { customMessage?: string }) => {
  const toastRef = useRef(null);

  return (
    <div
      ref={toastRef}
      id="toast-success"
      className="0 fixed left-1/2 top-[50px] flex w-full max-w-xs -translate-x-1/2 transform animate-toastSlide items-center rounded-lg bg-white p-4 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">
        {customMessage ? customMessage : "Saved"}
      </div>
    </div>
  );
};
