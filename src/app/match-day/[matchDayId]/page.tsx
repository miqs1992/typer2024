import { PastMatchDay } from "@/components/main/past-match-day/past-match-day";
import { getMatchDay } from "@/modules/admin/round-match-management/match-day.actions";
import { MatchDay } from "@/components/main/match-day/match-day";
import { getBets, hasUserSetBonusInThisRound } from "@/lib/actions/bet";
import { getCurrentProfile } from "@/lib/actions/profile";
import { getMatchesInDay } from "@/modules/admin/round-match-management/match.actions";

const currentDate = new Date();

const MatchDayPage = async ({ params }: any) => {
  // TODO: Not admin action
  const profile = await getCurrentProfile();
  const matchDay = await getMatchDay(params.matchDayId);
  const matches = await getMatchesInDay(params.matchDayId);
  const bets = await getBets(params.matchDayId, profile.id);
  const hasUserSetBonus = await hasUserSetBonusInThisRound(
    matchDay.id,
    matchDay.roundId,
    profile.id,
  );

  const { stopBetTime } = matchDay;

  return (
    <div className="relative my-4 mb-12 text-center text-3xl font-bold text-white">
      <h1 className="mb-10 inline-block">Match Day {matchDay.dayNumber}</h1>
      {stopBetTime < currentDate ? (
        <PastMatchDay matches={matches} />
      ) : (
        <MatchDay
          hideHeading
          bets={JSON.parse(JSON.stringify(bets))}
          disabledBonus={hasUserSetBonus}
        />
      )}
    </div>
  );
};
export default MatchDayPage;
