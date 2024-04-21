import { Ranking } from "@/components/ranking/ranking";
import { mockedRanking, mockedTopScorers } from "../../mocks/data";
import { TopScorers } from "@/components/top-scorers/top-scorers";
import { getMatchDayByTimeframe } from "@/lib/actions/matchDays";
import { MatchDay } from "@/components/match-day/match-day";
import { getBets } from "@/lib/actions/bet";
import Alert from "@/components/alert/alert";
import Link from "next/link";
import { isBeforeFirstMatch } from "../../config/firstMatchStart";
import { getCurrentProfile } from "@/lib/actions/profile";

const Home = async () => {
  const profile = await getCurrentProfile();
  const showAlert =
    isBeforeFirstMatch() &&
    (profile.winner === null || profile.topScorer === null);

  const currentMatchDay = await getMatchDayByTimeframe("current");
  const bets = await getBets(currentMatchDay?.id, profile.id);

  return (
    <div className="flex w-full flex-col gap-20">
      {showAlert && (
        <Alert>
          <span className="font-medium">
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
      {currentMatchDay ? (
        <div className="flex">
          <div className="flex-1"></div>
          <MatchDay
            matchDayNumber={currentMatchDay.dayNumber}
            bets={JSON.parse(JSON.stringify(bets))}
          />
        </div>
      ) : null}
      <div className="flex gap-20">
        <div className="grow">
          <h3 className="my-10 text-center text-3xl font-bold text-white">
            Current Top 5
          </h3>
          <Ranking rankingData={mockedRanking} showExtended={false} />
        </div>
        <div className="grow">
          <h3 className="my-10 text-center text-3xl font-bold text-white">
            Top Scorers
          </h3>
          <TopScorers topScorersData={mockedTopScorers} />
        </div>
      </div>
    </div>
  );
};
export default Home;
