import { getUsers } from "@/lib/actions/user";

import { Ranking, RankingData } from "@/components/main/ranking/ranking";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";
import Alert from "@/components/alert/alert";

const RankingPage = async () => {
  const usersData = await getUsers();

  return isBeforeFirstMatch() ? (
    <Alert>
      <p>Ranking not available before first match</p>
    </Alert>
  ) : (
    <Ranking rankingData={usersData as unknown as RankingData[]} />
  );
};

export default RankingPage;
