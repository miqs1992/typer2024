"use client";

import React from "react";

interface InputProps {
  field: string;
  label: string;
  value: number;
  max?: number;
  step?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = ({
  field,
  label,
  value,
  handleChange,
  max = 10,
  step = 1,
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
        type="number"
        name={field}
        id={field}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="1"
        value={value}
        onChange={handleChange}
        step={step}
        min="0"
        max={max}
        required
      />
    </div>
  );
};

export default NumberInput;
