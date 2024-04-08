import {getTeams} from "@/lib/actions/teams";
import Link from "next/link";
import FlagIcon from "@/components/flagIcon/flagIcon";

const TeamsPage = async () => {
  const teams = await getTeams();

  return (
    <div
      className="max-w-screen-xl flex flex-wrap items-center justify-between relative overflow-x-auto w-full sm:rounded-lg">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 w-full">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div>
            <h5 className="mr-3 font-semibold dark:text-white">Teams</h5>
          </div>
          <button type="button"
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 -ml-1" viewBox="0 0 20 20"
                 fill="currentColor"
                 aria-hidden="true">
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
            </svg>
            <Link href="/admin/teams/new">Add new team</Link>
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Flag</th>
          <th scope="col" className="px-6 py-3">Winner</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
        </thead>
        <tbody>
        {teams.map((team) => (
          <tr key={team.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <Link href={`/admin/teams/${team.id}`}>{team.name}</Link>
            </th>
            <td className="px-6 py-4"><FlagIcon country={team.flag} /></td>
            <td className="px-6 py-4">{team.winner ? "yes" : "no"}</td>
            <td className="px-6 py-4">
              <Link href={`/admin/teams/${team.id}/edit`}>Edit</Link>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

    </div>

  )
}

export default TeamsPage;
