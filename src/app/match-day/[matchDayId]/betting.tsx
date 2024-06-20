import { MyFutureMatchDay } from "@/components/main/my-match-day/my-future-match-day";
import {
  getMyBetsForFutureMatchDay,
  isBonusAvailableForMatchDay,
} from "@/modules/betting/betting.actions";
import { displayDate } from "@/tools/time-helpers";
import { PersistedMatchDay } from "@/modules/admin/round-match-management/match-day-management.service";

export const dynamic = "force-dynamic";

export const BettingPage = async ({
  matchDay,
}: {
  matchDay: PersistedMatchDay;
}) => {
  const bets = await getMyBetsForFutureMatchDay(matchDay.id);
  const isBonusAvailable = await isBonusAvailableForMatchDay(matchDay.id);

  const header = `Match Day ${matchDay.dayNumber} - ${displayDate(matchDay.stopBetTime)}`;

  return (
    <div className="relative my-4 mb-12 text-center text-3xl font-bold text-white">
      <h1 className="mb-10 inline-block">{header}</h1>
      <MyFutureMatchDay
        matchDay={matchDay}
        hideHeading
        bets={bets}
        disabledBonus={!isBonusAvailable}
      />
    </div>
  );
};
