import { getUsers } from "@/lib/actions/user";

import { Ranking, RankingData } from "../../components/main/ranking/ranking";

const RankingPage = async () => {
  const usersData = await getUsers();

  return <Ranking rankingData={usersData as unknown as RankingData[]} />;
};

export default RankingPage;
