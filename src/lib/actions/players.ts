"use server";

import { IPlayer } from "@/lib/models/player";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getPlayers = async (teamId: string): Promise<IPlayer[]> => {
  try {
    return prisma.player.findMany({ where: { teamId } });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch players");
  }
};

export const getPlayer = async (playerId: string): Promise<IPlayer> => {
  try {
    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!player) throw new Error("player not found");
    return player;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch players");
  }
};

export const createPlayer = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { name, teamId } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await prisma.player.create({ data: { name, teamId } });
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
  const { id, name, goals, assists, king } = Object.fromEntries(
    formData,
  ) as Record<string, string>;

  try {
    const player = await prisma.player.update({
      where: { id },
      data: {
        name,
        goals: Number(goals),
        assists: Number(assists),
        king: king === "on" || king === "true",
      },
    });
    revalidatePath(`/admin/teams/${player.teamId}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update player");
  }
};

export const removePlayer = async (formData: FormData): Promise<void> => {
  const { playerId, teamId } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await prisma.player.delete({ where: { id: playerId } });
    revalidatePath(`/admin/teams/${teamId}`);
  } catch (error) {
    console.log(error);
    throw new Error("failed to delete player");
  }
};

export const searchPlayers = async (inputValue: string): Promise<IPlayer[]> => {
  try {
    const players = await prisma.player.findMany({
      where: { name: { contains: inputValue, mode: "insensitive" } },
      include: { team: true },
      take: 5,
    });
    return players;
  } catch (error) {
    console.log(error);
    throw new Error("failed to search players");
  }
};

export const getFiveTopScorers = async (): Promise<IPlayer[]> => {
  try {
    const topFive = await prisma.player.findMany({
      orderBy: [{ goals: "desc" }, { assists: "desc" }],
      include: { team: true },
      take: 5,
    });
    return topFive;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch top scorers");
  }
};
