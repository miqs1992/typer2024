import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import PlayerForm from "@/components/teams/players/playerForm";

const NewPlayerPage = async ({ params }: Params) => {
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
