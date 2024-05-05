"use client";

import { NavLinkProps } from "@/components/navigation/parts/nav-link";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";

interface NavDropdownProps {
  id: string;
  label: string;
  links: NavLinkProps[];
}

export const NavDropdown = ({ id, label, links }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(navRef, () => {
    open && setOpen(false);
  });

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
    const rect = buttonRef.current!.getBoundingClientRect();
    navRef.current!.style.transform = `translate(${rect.left - rect.width * 0.5}px, ${event.clientY + 20}px)`;
  };

  return (
    <>
      <button
        id={id + "-button"}
        data-dropdown-toggle={id + "-nav"}
        onClick={onClick}
        ref={buttonRef}
        className="flex w-full items-center justify-between rounded px-3 py-2 font-light text-gray-900 hover:bg-gray-100 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
      >
        {label}
        <svg
          className="ms-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id={id + "-nav"}
        className={`z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700 ${open ? "block" : "hidden"}`}
        ref={navRef}
        style={{
          position: "absolute",
          inset: "0px auto auto 0px",
          margin: "0px",
        }}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-400"
          aria-labelledby={id + "-button"}
        >
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                href={to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
