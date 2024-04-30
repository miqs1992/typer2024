import { mockedRanking, mockedTopScorers } from "../../mocks/data";
import { TopScorers } from "@/components/main/top-scorers/top-scorers";
import { getMatchDayByTimeframe } from "@/lib/actions/matchDays";
import { MatchDay } from "@/components/main/match-day/match-day";
import { getBets, hasUserSetBonusInThisRound } from "@/lib/actions/bet";
import Alert from "@/components/alert/alert";
import Link from "next/link";
import { isBeforeFirstMatch } from "../../config/firstMatchStart";
import { getCurrentProfile } from "@/lib/actions/profile";
import { Ranking } from "@/components/main/ranking/ranking";
import { EmptyMatchDay } from "@/components/main/match-day/empty-match.day";

const Home = async () => {
  const profile = await getCurrentProfile();
  const showAlert =
    isBeforeFirstMatch() &&
    (profile.winner === null || profile.topScorer === null);

  const currentMatchDay = await getMatchDayByTimeframe("current");
  const previousMatchDay = await getMatchDayByTimeframe("previous");
  const currentBets = await getBets(currentMatchDay?.id, profile.id);
  const previousBets = await getBets(previousMatchDay?.id, profile.id);
  const hasUserSetBonus = await hasUserSetBonusInThisRound(
    currentMatchDay,
    profile.id,
  );

  return (
    <>
      {showAlert && (
        <Alert>
          <span className="text-md">
            You have not yet selected a winner or top scorer!
          </span>
          <Link
            className="ml-1 text-blue-600 underline dark:text-blue-600"
            href={"profile"}
          >
            Select now here
          </Link>
        </Alert>
      )}
      <div className="flex w-full flex-col gap-20">
        <div className="flex gap-20">
          {previousMatchDay ? (
            <MatchDay
              matchDayNumber={previousMatchDay.dayNumber}
              bets={JSON.parse(JSON.stringify(previousBets))}
              previous
            />
          ) : (
            <EmptyMatchDay previous />
          )}
          {currentMatchDay ? (
            <MatchDay
              matchDayNumber={currentMatchDay.dayNumber}
              bets={JSON.parse(JSON.stringify(currentBets))}
              disabledBonus={hasUserSetBonus}
            />
          ) : (
            <EmptyMatchDay />
          )}
        </div>
        <div className="flex gap-20">
          <div className="grow">
            <h3 className="my-10 text-center text-3xl font-bold text-white">
              Current Top 5
            </h3>
            <Ranking rankingData={mockedRanking} showExtended={false} />
          </div>
          <div>
            <h3 className="my-10 text-center text-3xl font-bold text-white">
              Top Scorers
            </h3>
            <TopScorers topScorersData={mockedTopScorers} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
