"use server";

import connectDB from "../../../config/database";
import { ITeam, Team } from "@/lib/models/team";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";

export const createTeam = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { name, flag } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newTeam = new Team({ name, flag });
    await newTeam.save();
    revalidatePath("/admin/teams");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create team");
  }
};

export const editTeam = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, name, flag, winner } = Object.fromEntries(formData);

  try {
    await connectDB();
    const team = await Team.findByIdAndUpdate(id, {
      name,
      flag,
      winner: winner ?? false,
    });
    await team.save();
    revalidatePath("/admin/teams");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update team");
  }
};

export const getTeam = async (id: string): Promise<ITeam> => {
  try {
    await connectDB();
    const team = await Team.findById(id);
    return {
      id: team.id,
      name: team.name,
      flag: team.flag,
      winner: team.winner,
    };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch team");
  }
};

export const getTeams = async (): Promise<ITeam[]> => {
  try {
    await connectDB();
    const team = await Team.find().sort({ name: 1 });
    return team.map((team) => ({
      id: team.id,
      name: team.name,
      flag: team.flag,
      winner: team.winner,
    }));
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch teams");
  }
};
