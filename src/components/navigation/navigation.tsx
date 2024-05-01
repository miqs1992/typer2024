import Image from "next/image";
import { handleLogout } from "@/lib/actions/session";
import { NavLink } from "@/components/navigation/parts/nav-link";
import { auth } from "@/lib/auth";
import { NavDropdown } from "@/components/navigation/parts/nav-dropdown";
import { getAllMatchDays, getMatchDaysInRound } from "@/lib/actions/matchDays";

const Navigation = async () => {
  const matchDays = await getAllMatchDays();
  const session = await auth();

  return (
    <nav className="border-gray-200 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_0px_15px] shadow-gray-600 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center rtl:space-x-reverse">
          <Image
            src="/ball.png"
            alt="Typer Logo"
            height="35"
            width="35"
            style={{
              position: "relative",
              top: "1px",
            }}
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Typer 2024
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-800">
            <NavLink to="/" label="Home" />
            <NavLink to="/ranking" label="Ranking" />
            <NavLink to="/profile" label="Profile" />
            <NavDropdown
              id="match-days"
              label="Match Days"
              links={matchDays.map((matchDay) => ({
                to: `/matchDay/${matchDay.id}`,
                label: `Match Day ${matchDay.dayNumber}`,
              }))}
            />
            {session?.user?.isAdmin && (
              <NavDropdown
                id="admin"
                label="Admin"
                links={[
                  { to: "/admin/teams", label: "Team & players" },
                  { to: "/admin/rounds", label: "Rounds & matches" },
                ]}
              />
            )}
            <form action={handleLogout}>
              <button className="block rounded px-3 py-2 font-light text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-300">
                Logout
              </button>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
