import Link from "next/link";
import PlayerForm from "@/components/admin/teams/players/playerForm";
import { getPlayer } from "@/lib/actions/players";
import { PlayerParams } from "@/app/admin/teams/[teamId]/players/[playerId]/player.params";

const EditPlayerPage = async ({ params }: PlayerParams) => {
  const { teamId, playerId } = await params;
  const player = await getPlayer(playerId);
  return (
    <div>
      <div className="relative my-4 mb-8 text-center text-3xl text-white">
        <Link
          href={`/admin/teams/${teamId}`}
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to team
        </Link>
        <h1>Edit {player.name}</h1>
      </div>
      <PlayerForm teamId={teamId} player={player} />
    </div>
  );
};

export default EditPlayerPage;
