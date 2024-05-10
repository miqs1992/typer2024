import Link from "next/link";
import { getTeam } from "@/lib/actions/teams";
import TeamForm from "@/components/admin/teams/teamForm";
import { TeamParams } from "@/app/admin/teams/[teamId]/team.params";

const EditTeamPage = async ({ params }: TeamParams) => {
  const team = await getTeam(params.teamId);

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/teams"
          className="absolute left-0 top-[7px] m-0 inline-block text-lg text-white underline"
        >
          Back to Teams
        </Link>
        <h1 className="inline-block">Edit Team</h1>
      </div>

      <TeamForm team={team} />
    </div>
  );
};

export default EditTeamPage;
