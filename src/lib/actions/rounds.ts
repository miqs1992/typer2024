"use server";

import connectDB from "../../../config/database";
import {IRound, Round} from "@/lib/models/round";
import {RequestState} from "@/lib/actions/state";
import {revalidatePath} from "next/cache";

export const getRounds = async () => {
  try {
    await connectDB();
    return Round.find().sort({ order: 1 });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch posts");
  }
}

export const createRound = async (previousState: RequestState | undefined, formData: FormData): Promise<RequestState> => {
  const { name, stage, scoreFactor, order } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newRound =  new Round({ name, stage, scoreFactor, order });
    await newRound.save();
    revalidatePath("/admin/rounds");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create round");
  }
}

export const editRound = async (previousState: RequestState | undefined, formData: FormData): Promise<RequestState> => {
  const { id, name, stage, scoreFactor, order } = Object.fromEntries(formData);

  try {
    await connectDB();
    const round = await Round.findByIdAndUpdate(id, { name, stage, scoreFactor, order });
    await round.save();
    revalidatePath("/admin/rounds");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update round");
  }
}

export const getRound = async (id: string): Promise<IRound> => {
  try {
    await connectDB();
    const round = await Round.findById(id);
    return {
      id: round.id,
      name: round.name,
      order: round.order,
      scoreFactor: round.scoreFactor,
      stage: round.stage,
    }
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch round");
  }
}
