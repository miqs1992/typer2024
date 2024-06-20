import { getMatchesInDay } from "@/modules/matches/match-day.actions";
import { displayDate } from "@/tools/time-helpers";
import { MatchDayHistory } from "@/components/main/past-match-day/match-day-history";
import { PersistedMatchDay } from "@/modules/admin/round-match-management/match-day-management.service";

export const dynamic = "force-dynamic";

export const HistoryPage = async ({
  matchDay,
}: {
  matchDay: PersistedMatchDay;
}) => {
  const matches = await getMatchesInDay(matchDay.id);
  const header = `Match Day ${matchDay.dayNumber} - ${displayDate(matchDay.stopBetTime)}`;

  return (
    <div className="relative my-4 mb-12 text-center text-3xl font-bold text-white">
      <h1 className="mb-10 inline-block">{header}</h1>
      <MatchDayHistory matches={matches} />
    </div>
  );
};
