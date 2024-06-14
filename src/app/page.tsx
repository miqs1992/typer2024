import { TopScorers } from "@/components/main/top-scorers/top-scorers";
import { getMatchDayByTimeframe } from "@/modules/matches/match-day.actions";
import { MyFutureMatchDay } from "@/components/main/my-match-day/my-future-match-day";
import Alert from "@/components/alert/alert";
import Link from "next/link";
import { isBeforeFirstMatch } from "../../config/firstMatchStart";
import { getCurrentProfile } from "@/lib/actions/profile";
import { Ranking, RankingData } from "@/components/main/ranking/ranking";
import { EmptyMatchDay } from "@/components/main/my-match-day/empty-match.day";
import { MatchDayTimeframe } from "@/modules/matches/match-day.service";
import { getUsers } from "@/lib/actions/user";
import { getFiveTopScorers } from "@/lib/actions/players";
import {
  getMyBetsForFutureMatchDay,
  getMyBetsForPastMatchDay,
  isBonusAvailableForMatchDay,
} from "@/modules/betting/betting.actions";
import { MyPastMatchDay } from "@/components/main/my-match-day/my-past-match-day";
import { InfoTile } from "@/components/main/info-tile/info-tile";

const Home = async () => {
  const profile = await getCurrentProfile();
  const showAlert =
    isBeforeFirstMatch() &&
    (profile.winner === null || profile.topScorer === null);

  const currentMatchDay = await getMatchDayByTimeframe(
    MatchDayTimeframe.Current,
  );
  const previousMatchDay = await getMatchDayByTimeframe(
    MatchDayTimeframe.Previous,
  );
  const currentBets = currentMatchDay
    ? await getMyBetsForFutureMatchDay(currentMatchDay.id)
    : [];
  const previousBets = previousMatchDay
    ? await getMyBetsForPastMatchDay(previousMatchDay.id)
    : [];
  const isBonusAvailable = currentMatchDay
    ? await isBonusAvailableForMatchDay(currentMatchDay.id)
    : false;
  const usersData = await getUsers();
  const topScorersData = await getFiveTopScorers();

  return (
    <div className="mt-6 lg:mt-12">
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
      <div className="flex w-full flex-col gap-10 lg:gap-20">
        <InfoTile
          myPoints={profile.points}
          myPlace={profile.leagueRank}
          stopBetTime={currentMatchDay?.stopBetTime}
        />
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-[50%]">
            {previousMatchDay ? (
              <MyPastMatchDay matchDay={previousMatchDay} bets={previousBets} />
            ) : (
              <EmptyMatchDay previous />
            )}
          </div>
          <div className="w-full lg:w-[50%]">
            {currentMatchDay ? (
              <MyFutureMatchDay
                matchDay={currentMatchDay}
                bets={currentBets}
                disabledBonus={!isBonusAvailable}
              />
            ) : (
              <EmptyMatchDay />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          <div className="w-full lg:w-[50%]">
            <Ranking
              rankingData={usersData as unknown as RankingData[]}
              showExtended={false}
            />
          </div>
          <div className="w-full lg:w-[50%]">
            <TopScorers
              topScorersData={JSON.parse(
                JSON.stringify(topScorersData as unknown as TopScorers[]),
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
