import Link from "next/link";
import RoundForm from "@/components/rounds/roundForm";
import { getRound } from "@/lib/actions/rounds";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getMatchDay, getMatchDays } from "@/lib/actions/matchDays";
import { EditMatchForm } from "@/components/edit-match-form/edit-match-form";
import { getMatch } from "@/lib/actions/match";

const EditMatchPage = async ({ params }: Params) => {
  const match = await getMatch(params.matchId);

  console.log(params.matchId);

  console.log(match);

  return (
    <div>
      x<h1>Edit match day</h1>
      <Link href="/admin/rounds">Back to match day</Link>
      <EditMatchForm match={JSON.parse(JSON.stringify(match))} />
    </div>
  );
};

export default EditMatchPage;
