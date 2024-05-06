"use client";

import { useClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "../nav-link";
import { usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { IMatchDay } from "@/lib/models/matchDay";
import Link from "next/link";

export const MobileMenu = ({
  matchDays,
}: {
  matchDays: Pick<IMatchDay, "id" | "dayNumber">[];
}) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(menuRef, () => {
    setTimeout(() => setIsOpen(false), 0);
  });

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        data-collapse-toggle="navbar-hamburger"
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-hamburger"
        aria-expanded="false"
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
        }}
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 top-[74px] z-40 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div
            className="fixed right-0 top-[57px] z-50 w-[80%]"
            id="navbar-hamburger"
          >
            <ul
              className="mt-4 flex flex-col bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-700"
              ref={menuRef as unknown as React.RefObject<HTMLUListElement>}
            >
              <NavLink to="/" label="Home" />
              <NavLink to="/ranking" label="Ranking" />
              <Accordion.Root className="w-full" type="single" collapsible>
                <Accordion.Item value="item-1">
                  <Accordion.Trigger className="group flex h-[50px] w-full items-center rounded px-3 py-2 font-light text-white">
                    <span className="block">Match Days</span>
                    <svg
                      className="ms-2.5 h-2.5 w-2.5 group-aria-expanded:rotate-180"
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
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <ul className="py-0 text-sm text-gray-700 dark:text-gray-400">
                      {matchDays.map((matchDay) => (
                        <li key={`/matchDay/${matchDay.id}`}>
                          <Link
                            href={`/matchDay/${matchDay.id}`}
                            className={`block px-4 py-2 text-gray-400 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-600 lg:dark:hover:text-white ${pathname === `/matchDay/${matchDay.id}` ? "dark:text-blue-400" : ""}`}
                          >
                            {`Match Day ${matchDay.dayNumber}`}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <NavLink to="/profile" label="Profile" />
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
};