"use server";

import connectDB from "../../../config/database";
import {MatchDay} from "@/lib/models/matchDay";
import {RequestState} from "@/lib/actions/state";
import {revalidatePath} from "next/cache";

export const getMatchDays = async (roundId: string) => {
  try {
    await connectDB();
    return MatchDay.find({ round: roundId }).sort({ dayNumber: 1 });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch posts");
  }
}

export const createMatchDay = async (previousState: RequestState | undefined, formData: FormData): Promise<RequestState> => {
  const { roundId, dayNumber, stopBetTime } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newMatchDay =  new MatchDay({ round: roundId, dayNumber, stopBetTime });
    await newMatchDay.save();
    revalidatePath(`/admin/rounds/${roundId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "failed to create match day" };
  }
}
