import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

import MatchDayForm from "@/components/admin/rounds/match-days/match-day-form";
import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";

const EditMatchDayPage = async ({ params }: Params) => {
  const matchDay = await getMatchDay(params.matchDayId);

  return (
    <div>
      <h1>Edit Match Day</h1>
      <Link href={`/admin/rounds/${params.roundId}`}>Back to round</Link>
      <MatchDayForm roundId={params.roundId} matchDay={matchDay} />
    </div>
  );
};

export default EditMatchDayPage;
