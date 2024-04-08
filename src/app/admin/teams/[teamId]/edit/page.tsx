import Link from "next/link";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import {getTeam} from "@/lib/actions/teams";
import TeamForm from "@/components/teams/teamForm";

const EditTeamPage = async ({params}: Params) => {
  const team = await getTeam(params.teamId)

  return (
    <div>
      <h1>Edit Team</h1>
      <Link href="/admin/teams">Back to teams</Link>

      <TeamForm team={team}/>
    </div>
  )
}

export default EditTeamPage;
