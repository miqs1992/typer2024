"use server";

import { revalidatePath } from "next/cache";
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
      .populate("matchDay")
      .lean();
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch matches");
  }
};

export const getMatch = async (matchId: string): Promise<IMatch> => {
  try {
    await connectDB();
    const match = await Match.findById(matchId)
      .populate("firstTeam")
      .populate("secondTeam")
      .populate("matchDay");
    if (!match) {
      throw new Error("Match not found");
    }
    return match;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch match");
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
    revalidatePath("/admin/rounds");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create match");
  }
};

export const editMatch = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, firstTeamResult, secondTeamResult } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const match = await Match.findByIdAndUpdate(id, {
      finalResult: { firstTeamResult, secondTeamResult },
    });
    await match.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to finish match");
  }
};
