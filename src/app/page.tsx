import { Ranking } from "../components/ranking/ranking";
import { mockedRanking, mockedTopScorers } from "../../mocks/data";
import { TopScorers } from "@/components/top-scorers/top-scorers";

const Home = async () => {
  return (
    <div>
      <div className="flex w-full gap-20">
        <div className="">
          <h3 className="my-10 text-center text-3xl font-bold text-white">
            Current Top 5
          </h3>
          <Ranking rankingData={mockedRanking} showExtended={false} />
        </div>
        <div className="grow">
          <h3 className="my-10 text-center  text-3xl font-bold text-white">
            Top scorers
          </h3>
          <TopScorers topScorersData={mockedTopScorers} />
        </div>
      </div>
    </div>
  );
};
export default Home;
