export const dynamic = "force-dynamic";

import { MatchDayHistory } from "@/components/main/past-match-day/match-day-history";
import { MyFutureMatchDay } from "@/components/main/my-match-day/my-future-match-day";
import { getMatchesInDay } from "@/modules/admin/round-match-management/match.actions";
import { getMatchDayById } from "@/modules/matches/match-day.actions";
import {
  getMyBetsForFutureMatchDay,
  isBonusAvailableForMatchDay,
} from "@/modules/betting/betting.actions";
import { displayDate } from "@/tools/time-helpers";

const currentDate = new Date();

const MatchDayPage = async ({ params }: any) => {
  const matchDay = await getMatchDayById(params.matchDayId);
  const isPastMatchDay = matchDay.stopBetTime < currentDate;
  console.log(matchDay.stopBetTime, currentDate, isPastMatchDay);
  // TODO: Not admin action
  const matches = isPastMatchDay
    ? await getMatchesInDay(params.matchDayId)
    : [];
  const bets = isPastMatchDay
    ? []
    : await getMyBetsForFutureMatchDay(matchDay.id);
  const isBonusAvailable = isPastMatchDay
    ? false
    : await isBonusAvailableForMatchDay(matchDay.id);

  const header = `Match Day ${matchDay.dayNumber} - ${displayDate(matchDay.stopBetTime)}`;

  return (
    <div className="relative my-4 mb-12 text-center text-3xl font-bold text-white">
      <h1 className="mb-10 inline-block">{header}</h1>
      {isPastMatchDay ? (
        <MatchDayHistory matches={matches} />
      ) : (
        <MyFutureMatchDay
          matchDay={matchDay}
          hideHeading
          bets={bets}
          disabledBonus={!isBonusAvailable}
        />
      )}
    </div>
  );
};
export default MatchDayPage;
