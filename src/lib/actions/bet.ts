"use server";

import connectDB from "../../../config/database";
import { Bet, IBet } from "../models/bet";

export const getAllBetsForMatch = async (matchId: string): Promise<IBet[]> => {
  try {
    await connectDB();
    return await Bet.find({ match: matchId }).populate("user");
  } catch (error) {
    throw new Error("failed to fetch bets");
  }
};
