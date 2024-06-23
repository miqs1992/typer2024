"use server";

import { getCurrentSession } from "@/modules/helpers/get-current-session";
import { RoundService } from "@/modules/matches/round.service";

const getService = async () => {
  const session = await getCurrentSession();
  return new RoundService(session);
};

export const getAllRounds = async () => {
  try {
    const service = await getService();
    return service.getAllRounds();
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch all match days");
  }
};

export const getRoundById = async (id: string) => {
  try {
    const service = await getService();
    return service.getRoundById(id);
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch round with id: ${id}`);
  }
};
