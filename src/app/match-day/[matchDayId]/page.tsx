export const dynamic = "force-dynamic";

import { MatchDayParams } from "@/app/match-day/[matchDayId]/match-day.params";
import { getMatchDayById } from "@/modules/matches/match-day.actions";
import { BettingPage } from "@/app/match-day/[matchDayId]/betting";
import { HistoryPage } from "@/app/match-day/[matchDayId]/history";

const MatchDayPage = async ({ params }: MatchDayParams) => {
  const matchDay = await getMatchDayById(params.matchDayId);
  const isPastMatchDay = matchDay.stopBetTime < new Date();

  return isPastMatchDay ? (
    <HistoryPage matchDay={matchDay} />
  ) : (
    <BettingPage matchDay={matchDay} />
  );
};
export default MatchDayPage;
