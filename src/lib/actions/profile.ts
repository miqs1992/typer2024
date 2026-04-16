"use server";

import { auth } from "@/lib/auth";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";
import { prisma } from "@/lib/prisma";

export interface Profile {
  id: string;
  email: string;
  username: string;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  winner: { name: string; id: string; flag: string } | null;
  topScorer: {
    name: string;
    id: string;
    team: { name: string; flag: string };
  } | null;
}

const getCurrentUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("not authorized");
  }

  return userId;
};

export const getCurrentProfile = async (): Promise<Profile> => {
  try {
    const userId = await getCurrentUserId();
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        winner: true,
        topScorer: { include: { team: true } },
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      leagueRank: user.leagueRank,
      points: user.points,
      exactBetCount: user.exactBetCount,
      winner: user.winner
        ? { name: user.winner.name, id: user.winner.id, flag: user.winner.flag }
        : null,
      topScorer: user.topScorer
        ? {
            name: user.topScorer.name,
            id: user.topScorer.id,
            team: {
              name: user.topScorer.team.name,
              flag: user.topScorer.team.flag,
            },
          }
        : null,
    };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch profile");
  }
};

export const setWinnerAndTopScorer = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { winnerId, topScorerId } = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  if (!winnerId || !topScorerId) {
    return { error: "winner and top scorer are required" };
  }

  if (!isBeforeFirstMatch()) {
    return {
      error:
        "You can only set the winner and top scorer before the first match starts",
    };
  }

  try {
    const userId = await getCurrentUserId();

    await prisma.user.update({
      where: { id: userId },
      data: { winnerId, topScorerId },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update profile");
  }
};
