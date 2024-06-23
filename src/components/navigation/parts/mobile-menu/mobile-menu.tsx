"use client";

import { useClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";
import { handleLogout } from "@/lib/actions/session";
import { NavLink } from "../nav-link";
import { usePathname } from "next/navigation";
import { displayDate } from "@/tools/time-helpers";
import { PublicMatchDay } from "@/modules/matches/match-day.service";
import { PublicRound } from "@/modules/matches/round.service";
import { MobileAccordion } from "@/components/navigation/parts/mobile-menu/parts/mobile-accordion";

export const MobileMenu = ({
  matchDays,
  rounds,
  isAdmin = false,
}: {
  matchDays: PublicMatchDay[];
  rounds: PublicRound[];
  isAdmin?: boolean;
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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
            className="fixed right-0 top-[56px] z-50 w-[80%]"
            id="navbar-hamburger"
          >
            <ul
              className="mt-4 flex flex-col bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-700"
              ref={menuRef as unknown as React.RefObject<HTMLUListElement>}
            >
              <NavLink to="/" label="Home" />
              <NavLink to="/ranking" label="Ranking" />
              <NavLink to="/rules" label="Rules" />

              <MobileAccordion
                title="Match Days"
                elements={matchDays.map((matchDay) => ({
                  id: matchDay.id,
                  label: `MD ${matchDay.dayNumber} (${displayDate(matchDay.stopBetTime)})`,
                  link: `/match-day/${matchDay.id}`,
                }))}
              />

              <MobileAccordion
                title="Round stats"
                elements={rounds.map((round) => ({
                  id: round.id,
                  label: round.name,
                  link: `/rounds/${round.id}`,
                }))}
              />
              {isAdmin ? (
                <MobileAccordion
                  title="Admin"
                  elements={[
                    {
                      id: "users",
                      label: "Users",
                      link: "/admin/users",
                    },
                    {
                      id: "teams",
                      label: "Team & players",
                      link: "/admin/teams",
                    },
                    {
                      id: "rounds",
                      label: "Rounds & matches",
                      link: "/admin/rounds",
                    },
                  ]}
                />
              ) : null}
              <NavLink to="/profile" label="Profile" />
              <form action={handleLogout}>
                <button className="block rounded px-3 py-2 font-light text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-300">
                  Logout
                </button>
              </form>
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
};
