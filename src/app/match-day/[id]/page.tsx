import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";

const MatchDayPage = async ({ params }: Params) => {
  // TODO: Not admin action
  const matchDay = await getMatchDay(params.id);

  return (
    <div className="relative my-4 mb-12 text-center text-3xl text-white">
      <h1 className="inline-block">Match Day {matchDay.dayNumber}</h1>
    </div>
  );
};
export default MatchDayPage;
