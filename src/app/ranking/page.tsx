import { mockedRanking } from "../../../mocks/data";
import { Ranking } from "../../components/ranking/ranking";

const RankingPage = async () => {
  return (
    <>
      <h1 className="my-10 text-center text-3xl font-bold text-white">
        Current ranking
      </h1>
      <Ranking rankingData={mockedRanking} />
    </>
  );
};

export default RankingPage;
