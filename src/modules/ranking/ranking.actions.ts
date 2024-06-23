"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { RankingService } from "@/modules/ranking/ranking.service";

const getService = async () => {
  const session = await getCurrentSession();
  return new RankingService(session);
};

export const getRanking = async () => {
  try {
    const service = await getService();
    return service.getRanking();
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get ranking`);
  }
};

export const getRoundRanking = async (roundId: string) => {
  try {
    const service = await getService();
    return service.getRoundRanking(roundId);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to get ranking for round: ${roundId}`);
  }
};
