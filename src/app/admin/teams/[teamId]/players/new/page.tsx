import Link from "next/link";
import PlayerForm from "@/components/admin/teams/players/playerForm";
import { TeamParams } from "@/app/admin/teams/[teamId]/team.params";

const NewPlayerPage = async ({ params }: TeamParams) => {
  const teamId = params.teamId;
  return (
    <div>
      <div className="relative my-4 mb-8 text-center text-3xl text-white">
        <Link
          href={`/admin/teams/${teamId}`}
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to team
        </Link>
        <h1 className="inline-block">New Player</h1>
      </div>

      <PlayerForm teamId={teamId} />
    </div>
  );
};

export default NewPlayerPage;
