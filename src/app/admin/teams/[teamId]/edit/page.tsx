import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getTeam } from "@/lib/actions/teams";
import TeamForm from "@/components/teams/teamForm";

const EditTeamPage = async ({ params }: Params) => {
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
