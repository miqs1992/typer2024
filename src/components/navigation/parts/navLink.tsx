"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  to: string;
  label: string;
}

const defaultClassName =
  "block py-2 px-3 text-gray-900 font-light rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 md:p-0 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
const activeClassName =
  "block py-2 px-3 text-white bg-blue-700  font-bold rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";

const NavLink = ({ to, label }: NavLinkProps) => {
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

export default NavLink;
