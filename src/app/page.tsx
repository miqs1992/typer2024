import { Ranking } from "../components/ranking/ranking";
import { mockedRanking, mockedTopScorers } from "../../mocks/data";
import { TopScorers } from "@/components/top-scorers/top-scorers";
import { getMatchDayByTimeframe } from "@/lib/actions/matchDays";
import { MatchDay } from "@/components/bet/bet";
import { getBets } from "@/lib/actions/bet";
import { auth } from "@/lib/auth";

const Home = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const currentMatchDay = await getMatchDayByTimeframe("current");
  const bets = await getBets(currentMatchDay?._id, userId!);

  return (
    <div className="flex w-full flex-col gap-20">
      {currentMatchDay ? (
        <MatchDay
          matchDayNumber={currentMatchDay.dayNumber}
          bets={JSON.parse(JSON.stringify(bets))}
        />
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
