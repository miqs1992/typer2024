"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { BettingService } from "@/modules/betting/betting.service";
import { RequestState } from "@/lib/actions/state";
import { ServiceError } from "@/modules/service.error";

const getService = async () => {
  const session = await getCurrentSession();
  return new BettingService(session);
};

export const getMyBetsForFutureMatchDay = async (matchDayId: string) => {
  try {
    const service = await getService();
    return service.getMyBetsForFutureMatchDay(matchDayId);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch bets for Match Day ${matchDayId}`);
  }
};

export const getMyBetsForPastMatchDay = async (matchDayId: string) => {
  try {
    const service = await getService();
    return service.getMyBetsForPastMatchDay(matchDayId);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch bets for Match Day ${matchDayId}`);
  }
};

export const isBonusAvailableForMatchDay = async (matchDayId: string) => {
  try {
    const service = await getService();
    return service.isBonusAvailableForMatchDay(matchDayId);
  } catch (error) {
    console.log(error);
    throw new Error(
      `failed to check bonus availability for Match Day ${matchDayId}`,
    );
  }
};

export const updateMyBets = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { betList, matchDayId } = Object.fromEntries(formData) as any;

  const parsedBetList = JSON.parse(betList);

  try {
    const service = await getService();
    await service.updateBets(matchDayId, parsedBetList);
    return { message: "Bets updated correctly." };
  } catch (error) {
    if (error instanceof ServiceError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const getAllBetsInPastMatchDay = async (matchDayId: string) => {
  try {
    const service = await getService();
    return service.getAllBetsInPastMatchDay(matchDayId);
  } catch (error) {
    console.log(error);
    throw new Error(`failed to fetch all bets for Match Day ${matchDayId}`);
  }
};
