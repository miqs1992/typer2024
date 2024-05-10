import Link from "next/link";
import MatchDayForm from "@/components/admin/rounds/match-days/match-day-form";
import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";
import { MatchDayParams } from "@/app/admin/rounds/[roundId]/matchDays/[matchDayId]/match-day.params";

const EditMatchDayPage = async ({ params }: MatchDayParams) => {
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
