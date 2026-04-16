"use server";

import { ITeam } from "@/lib/models/team";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const createTeam = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { name, flag } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await prisma.team.create({ data: { name, flag } });
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
  const { id, name, flag, winner } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  try {
    await prisma.team.update({
      where: { id },
      data: { name, flag, winner: winner === "on" || winner === "true" },
    });
    revalidatePath("/admin/teams");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update team");
  }
};

export const getTeam = async (id: string): Promise<ITeam> => {
  try {
    const team = await prisma.team.findUnique({ where: { id } });
    if (!team) throw new Error("team not found");
    return team;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch team");
  }
};

export const getTeams = async (): Promise<ITeam[]> => {
  try {
    return prisma.team.findMany({ orderBy: { name: "asc" } });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch teams");
  }
};

export const searchTeams = async (search: string): Promise<ITeam[]> => {
  try {
    return prisma.team.findMany({
      where: { name: { contains: search, mode: "insensitive" } },
      take: 5,
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to search teams");
  }
};
