import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import PlayerForm from "@/components/admin/teams/players/playerForm";
import { getPlayer } from "@/lib/actions/players";

const EditPlayerPage = async ({ params }: Params) => {
  const teamId = params.teamId;
  const player = await getPlayer(params.playerId);
  return (
    <div>
      <h1>Edit {player.name}</h1>
      <Link href={`/admin/teams/${teamId}`}>Back to team</Link>
      <PlayerForm teamId={teamId} player={player} />
    </div>
  );
};

export default EditPlayerPage;
