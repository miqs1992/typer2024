import { getTeams } from "@/lib/actions/teams";
import Link from "next/link";
import FlagIcon from "@/components/flagIcon/flag-icon";

const TeamsPage = async () => {
  const teams = await getTeams();

  return (
    <>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <h1 className="inline-block">Teams</h1>
      </div>
      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto sm:rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">Teams</h5>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <Link href="/admin/teams/new">Add new team</Link>
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Flag
              </th>
              <th scope="col" className="px-6 py-3">
                Winner
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <Link href={`/admin/teams/${team.id}`}>{team.name}</Link>
                </th>
                <td className="px-6 py-4">
                  <FlagIcon country={team.flag} />
                </td>
                <td className="px-6 py-4">{team.winner ? "yes" : "no"}</td>
                <td className="px-6 py-4">
                  <Link href={`/admin/teams/${team.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamsPage;
