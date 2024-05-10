import Link from "next/link";
import PlayerForm from "@/components/admin/teams/players/playerForm";
import { TeamParams } from "@/app/admin/teams/[teamId]/team.params";

const NewPlayerPage = async ({ params }: TeamParams) => {
  const teamId = params.teamId;
  return (
    <div>
      <h1>New Player</h1>
      <Link href={`/admin/teams/${teamId}`}>Back to team</Link>
      <PlayerForm teamId={teamId} />
    </div>
  );
};

export default NewPlayerPage;
