import { MatchForm } from "@/components/result-form/result-form";
import RoundForm from "@/components/rounds/roundForm";
import { getTeams } from "@/lib/actions/teams";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

const NewMatchPage = async ({ params }: Params) => {
  const teams = await getTeams();

  return (
    <div>
      <div className="relative my-4 mb-12 text-center text-3xl text-white">
        <Link
          href="/admin/rounds"
          className="absolute left-0 top-[3px] m-0 inline-block text-lg text-white underline"
        >
          Back to matches
        </Link>
        <h1 className="inline-block">New Match</h1>
      </div>

      <MatchForm
        teams={teams}
        matchDayId={params.matchDayId}
        roundId={params.roundId}
      />
    </div>
  );
};

export default NewMatchPage;
