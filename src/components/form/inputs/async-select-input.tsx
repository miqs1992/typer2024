"use client";

import AsyncSelect from "react-select/async";
import React, { ReactNode } from "react";

export type SelectOption = {
  readonly value: string;
  readonly label: ReactNode | string;
};

interface AsyncSelectInputProps {
  field: string;
  label: string;
  defaultValue?: SelectOption;
  loadFunction: (inputValue: string) => Promise<SelectOption[]>;
}

const AsyncSelectInput = ({
  field,
  label,
  loadFunction,
  defaultValue,
}: AsyncSelectInputProps) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={field}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <AsyncSelect
        name={field}
        cacheOptions
        defaultOptions
        defaultValue={defaultValue}
        loadOptions={loadFunction}
        classNames={{
          control: () =>
            "bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500",
          singleValue: () => "text-white",
          placeholder: () => "text-white",
          input: () => "text-white",
          option: () =>
            "bg-gray-800 font-thin text-white dark:hover:bg-gray-600 cursor-pointer",
          menuList: () => "bg-gray-800",
        }}
        required
      />
    </div>
  );
};

export default AsyncSelectInput;
