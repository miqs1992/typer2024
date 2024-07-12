import { getTeam } from "@/lib/actions/teams";
import Link from "next/link";
import FlagIcon from "@/components/flagIcon/flag-icon";
import { getPlayers, removePlayer } from "@/lib/actions/players";
import { TeamParams } from "@/app/admin/teams/[teamId]/team.params";

const TeamPage = async ({ params }: TeamParams) => {
  const team = await getTeam(params.teamId);
  const players = await getPlayers(team.id);

  return (
    <div className="relative mt-5 flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto rounded-lg">
      <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
        <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
          <div>
            <h5 className="mr-3 flex gap-2 font-semibold dark:text-white">
              <FlagIcon country={team.flag} />
              {team.name}
            </h5>
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
            <Link href={`/admin/teams/${team.id}/players/new`}>
              Add new player
            </Link>
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
              Goal
            </th>
            <th scope="col" className="px-6 py-3">
              Assists
            </th>
            <th scope="col" className="px-6 py-3">
              King
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={team.id}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {player.name}
              </th>
              <td className="px-6 py-4">{player.goals}</td>
              <td className="px-6 py-4">{player.assists}</td>
              <td className="px-6 py-4">{player.king ? "yes" : "no"}</td>
              <td className="flex gap-2 px-6 py-4">
                <Link
                  href={`/admin/teams/${team.id}/players/${player.id}/edit`}
                >
                  Edit
                </Link>
                <form action={removePlayer}>
                  <input type="hidden" name="playerId" value={player.id} />
                  <input type="hidden" name="teamId" value={team.id} />
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamPage;
