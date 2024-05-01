"use server";

import connectDB from "../../../config/database";
import { IMatchDay, MatchDay } from "@/lib/models/matchDay";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";

export const getMatchDaysInRound = async (roundId: string) => {
  try {
    await connectDB();
    return MatchDay.find({ round: roundId }).sort({ dayNumber: 1 });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch match days for round");
  }
};

export const getAllMatchDays = async (): Promise<
  Pick<IMatchDay, "id" | "dayNumber">[]
> => {
  try {
    await connectDB();
    const data = (await MatchDay.find().sort({ dayNumber: 1 })) as IMatchDay[];
    return data.map((matchDay) => ({
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch all match days");
  }
};

export const getMatchDay = async (matchDayId: string): Promise<IMatchDay> => {
  try {
    await connectDB();
    const matchDay = await MatchDay.findById(matchDayId);
    return {
      id: matchDay.id,
      round: matchDay.round,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
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

export const getMatchDayByTimeframe = async (
  type: "current" | "previous" | "past",
) => {
  try {
    await connectDB();
    const now = new Date();

    switch (type) {
      case "current":
        return MatchDay.findOne({ stopBetTime: { $gte: now } }).sort({
          stopBetTime: 1,
        });
      case "previous":
        return MatchDay.findOne({ stopBetTime: { $lt: now } }).sort({
          stopBetTime: -1,
        });
      case "past":
        return MatchDay.find({ stopBetTime: { $lt: now } }).sort({
          stopBetTime: -1,
        });
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Failed to fetch ${type} match day`);
  }
};
