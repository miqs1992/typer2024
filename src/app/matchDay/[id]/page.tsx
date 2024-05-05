import { getMatchDay } from "@/lib/actions/matchDays";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const MatchDayPage = async ({ params }: Params) => {
  const matchDay = await getMatchDay(params.id);

  return <div>Match Day {matchDay.dayNumber}</div>;
};
export default MatchDayPage;
