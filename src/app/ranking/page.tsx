import { mockedRanking } from "../../../mocks/data";
import { Ranking } from "../../components/main/ranking/ranking";

const RankingPage = async () => {
  return <Ranking rankingData={mockedRanking} />;
};

export default RankingPage;
