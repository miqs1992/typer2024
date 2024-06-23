import { Ranking } from "@/components/main/ranking/ranking";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";
import Alert from "@/components/alert/alert";
import { getRanking } from "@/modules/ranking/ranking.actions";

const RankingPage = async () => {
  const rankingData = await getRanking();

  return isBeforeFirstMatch() ? (
    <Alert>
      <p>Ranking not available before first match</p>
    </Alert>
  ) : (
    <Ranking rankingData={rankingData} />
  );
};

export default RankingPage;
