"use client";

import React from "react";

interface InputProps {
  field: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  required?: boolean;
  hint?: string;
}

const TextInput = ({
  field,
  label,
  value,
  handleChange,
  type = "text",
  required = true,
  hint,
}: InputProps) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={field}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={field}
        id={field}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={label}
        value={value}
        onChange={handleChange}
        required={required}
      />
      {hint && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
      )}
    </div>
  );
};

export default TextInput;
