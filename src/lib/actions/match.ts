"use server";

import connectDB from "../../../config/database";
import { IMatch, Match } from "../models/match";
import { RequestState } from "./state";

export const getMatches = async (matchDayId: string): Promise<IMatch[]> => {
  try {
    await connectDB();
    return Match.find({ matchDay: matchDayId })
      .sort({ start: 1 })
      .populate("firstTeam")
      .populate("secondTeam")
      .populate("matchDay");
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch matches");
  }
};

export const createMatch = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { firstTeam, secondTeam, matchDay, start } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const newMatch = new Match({
      firstTeam,
      secondTeam,
      matchDay,
      start,
    });
    await newMatch.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create match");
  }
};
