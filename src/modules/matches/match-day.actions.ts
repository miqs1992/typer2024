"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import {
  MatchDayService,
  MatchDayTimeframe,
} from "@/modules/matches/match-day.service";

const getService = async () => {
  const session = await getCurrentSession();
  return new MatchDayService(session);
};

export const getAllMatchDays = async () => {
  try {
    const service = await getService();
    return service.getAllMatchDays();
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch all match days");
  }
};

export const getMatchDayByTimeframe = async (type: MatchDayTimeframe) => {
  try {
    const service = await getService();
    return service.getMatchDayByTimeframe(type);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch ${type} match day`);
  }
};

export const getMatchDayById = async (id: string) => {
  try {
    const service = await getService();
    return service.getMatchDayById(id);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch match day with id: ${id}`);
  }
};
