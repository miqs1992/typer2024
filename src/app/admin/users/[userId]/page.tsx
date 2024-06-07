import { UserParams } from "@/app/admin/users/[userId]/user.params";
import { getUserById } from "@/modules/admin/users-management/users.actions";

const UserPage = async ({ params: { userId } }: UserParams) => {
  const user = await getUserById(userId);

  console.log(user);

  return (
    <>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <h1 className="inline-block">{user.username}</h1>
      </div>
      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">
                {user.email}
              </h5>
            </div>
          </div>
        </div>

        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Ranking
              </th>
              <td className="px-6 py-4">
                {`${user.leagueRank} - points: ${user.points}, exact: ${user.exactBetCount}`}
              </td>
            </tr>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                Winner / Top Scorer
              </th>
              <td className="px-6 py-4">
                {`winner: ${user.winner}, top scorer: ${user.topScorer}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserPage;
