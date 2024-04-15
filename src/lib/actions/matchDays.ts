"use server";

import connectDB from "../../../config/database";
import { IMatchDay, MatchDay } from "@/lib/models/matchDay";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";

export const getMatchDays = async (roundId: string) => {
  try {
    await connectDB();
    return MatchDay.find({ round: roundId }).sort({ dayNumber: 1 });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch posts");
  }
};

export const getMatchDay = async (matchDayId: string): Promise<IMatchDay> => {
  try {
    await connectDB();
    const day = await MatchDay.findById(matchDayId);
    return {
      id: day.id,
      dayNumber: day.dayNumber,
      stopBetTime: day.stopBetTime,
      round: day.round.toString(),
    };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch match day");
  }
};

export const createMatchDay = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { roundId, dayNumber, stopBetTime } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newMatchDay = new MatchDay({
      round: roundId,
      dayNumber,
      stopBetTime,
    });
    await newMatchDay.save();
    revalidatePath(`/admin/rounds/${roundId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "failed to create match day" };
  }
};

export const editMatchDay = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, roundId, dayNumber, stopBetTime } = Object.fromEntries(formData);

  console.log(id, roundId, dayNumber, stopBetTime);

  try {
    await connectDB();
    const day = await MatchDay.findByIdAndUpdate(id, {
      dayNumber,
      stopBetTime,
    });
    await day.save();
    revalidatePath(`/admin/rounds/${roundId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update match day");
  }
};
