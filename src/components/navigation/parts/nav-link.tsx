"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  to: string;
  label: string;
}

const defaultClassName =
  "block h-[50px] md:h-auto py-2 px-3 flex lg:border-none items-center lg:block text-gray-900 font-light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
const activeClassName =
  "block h-[50px] md:h-auto py-2 px-3 flex lg:border-none items-center lg:block lg:block text-blue-400 font-bold rounded md:bg-transparent dark:text-blue-400 md:p-0 md:dark:text-blue-500";

export const NavLink = ({ to, label }: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={to}
        className={pathName === to ? activeClassName : defaultClassName}
      >
        {label}
      </Link>
    </li>
  );
};
