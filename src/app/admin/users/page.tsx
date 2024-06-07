import {
  getUsers,
  removeUser,
} from "@/modules/admin/users-management/users.actions";
import Link from "next/link";

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <h1 className="inline-block">Users</h1>
      </div>
      <div className="relative flex w-full max-w-screen-xl flex-wrap items-center justify-between overflow-x-auto rounded-lg">
        <div className="relative w-full overflow-hidden bg-white shadow-md dark:bg-gray-800">
          <div className="flex-row items-center justify-between space-y-3 p-4 sm:flex sm:space-x-4 sm:space-y-0">
            <div>
              <h5 className="mr-3 font-semibold dark:text-white">Users</h5>
            </div>
          </div>
        </div>

        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Points / Exact
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  <Link href={`/admin/users/${user.id}`}>{user.username}</Link>
                </th>
                <td className="px-6 py-4">
                  {`${user.email} ${user.isAdmin ? "(Admin)" : ""}`}
                </td>
                <td className="px-6 py-4">
                  {user.points} / {user.exactBetCount}
                </td>
                <td className="flex gap-2 px-6 py-4">
                  <Link href={`/admin/users/${user.id}/edit`}>Edit</Link>
                  <form action={removeUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;
