import {getRounds} from "@/lib/actions/rounds";
import Link from "next/link";

const RoundsPage = async () => {
  const rounds = await getRounds()
  return (
    <div>
      <h1>Rounds</h1>

      <Link href="/admin/rounds/new">Add new round</Link>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Stage</th>
            <th scope="col" className="px-6 py-3">Factor</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
          </thead>
          <tbody>
          {rounds.map((round) => (
            <tr key={round.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {round.name}
              </th>
              <td className="px-6 py-4">{round.stage}</td>
              <td className="px-6 py-4">{round.scoreFactor}</td>
              <td className="px-6 py-4">
                <Link href={`/admin/rounds/${round.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoundsPage;
