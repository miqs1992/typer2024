"use server";

import connectDB from "../../../config/database";
import { IPlayer, Player } from "@/lib/models/player";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";

export const getPlayers = async (teamId: string): Promise<IPlayer[]> => {
  try {
    await connectDB();
    return Player.find({ team: teamId });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch players");
  }
};

export const getPlayer = async (playerId: string): Promise<IPlayer> => {
  try {
    await connectDB();
    const player = await Player.findById(playerId);
    return {
      id: player.id,
      name: player.name,
      goals: player.goals,
      assists: player.assists,
      team: player.team,
    };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch players");
  }
};

export const createPlayer = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { name, teamId } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newPlayer = new Player({ name, team: teamId });
    await newPlayer.save();
    revalidatePath(`/admin/teams/${teamId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create player");
  }
};

export const editPlayer = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, name, goals, assists } = Object.fromEntries(formData);

  try {
    await connectDB();
    const player = await Player.findByIdAndUpdate(id, { name, goals, assists });
    await player.save();
    revalidatePath(`/admin/teams/${player.team}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update player");
  }
};

export const removePlayer = async (formData: FormData): Promise<void> => {
  const { playerId, teamId } = Object.fromEntries(formData);

  try {
    await connectDB();
    await Player.findByIdAndDelete(playerId);
    revalidatePath(`/admin/teams/${teamId}`);
  } catch (error) {
    console.log(error);
    throw new Error("failed to delete player");
  }
};

export const searchPlayers = async (inputValue: string): Promise<IPlayer[]> => {
  try {
    await connectDB();
    const players = await Player.find({
      name: { $regex: inputValue, $options: "i" },
    }).limit(5);
    return players.map((player) => ({
      id: player.id,
      name: player.name,
      goals: player.goals,
      assists: player.assists,
      team: player.team.toString(),
    }));
  } catch (error) {
    console.log(error);
    throw new Error("failed to search players");
  }
};
