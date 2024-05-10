import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";
import { MatchDayParams } from "@/app/match-day/[matchDayId]/match-day.params";

const MatchDayPage = async ({ params }: MatchDayParams) => {
  // TODO: Not admin action
  const matchDay = await getMatchDay(params.matchDayId);

  return (
    <div className="relative my-4 mb-12 text-center text-3xl text-white">
      <h1 className="inline-block">Match Day {matchDay.dayNumber}</h1>
    </div>
  );
};
export default MatchDayPage;
