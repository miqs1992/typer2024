"use server";

import connectDB from "../../../config/database";
import { IPlayer, Player } from "@/lib/models/player";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { Team } from "../models/team";

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
      team: player.team.toString(),
      king: player.king,
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
  const { id, name, goals, assists, king } = Object.fromEntries(formData);

  try {
    await connectDB();
    const player = await Player.findByIdAndUpdate(id, {
      name,
      goals,
      assists,
      king: king ?? false,
    });
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

    const newPlayers = await Promise.all(
      players.map(async (player) => {
        const team = await Team.findOne({ _id: player.team });
        return {
          id: player.id,
          name: player.name,
          goals: player.goals,
          assists: player.assists,
          team: {
            team: team?.name,
            flag: team?.flag,
          },
          king: player.king,
        };
      }),
    );

    return newPlayers as unknown as IPlayer[];
  } catch (error) {
    console.log(error);
    throw new Error("failed to search players");
  }
};

export const getFiveTopScorers = async (): Promise<IPlayer[]> => {
  try {
    await connectDB();
    const topFive = await Player.find()
      .sort({ goals: -1, assists: -1 })
      .limit(5)
      .populate("team");

    return topFive.map((player) => {
      return {
        id: player.id,
        name: player.name,
        goals: player.goals,
        assists: player.assists,
        team: player.team,
        king: player.king,
      };
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch top scorers");
  }
};
