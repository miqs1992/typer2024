"use server";

import connectDB from "../../../config/database";
import { IUser, User } from "@/lib/models/user";
import { auth } from "@/lib/auth";
import { RequestState } from "@/lib/actions/state";
import { revalidatePath } from "next/cache";
import { isBeforeFirstMatch } from "../../../config/firstMatchStart";
import { NameAndFlag } from "@/components/main/ranking/ranking";

export interface Profile {
  id: string;
  email: string;
  username: string;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  winner: { name: string; id: string } | null;
  topScorer: { name: string; id: string; team: NameAndFlag } | null;
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
    await connectDB();
    const userId = await getCurrentUserId();
    const user = await User.findById(userId)
      .populate("winner")
      .populate({
        path: "topScorer",
        populate: {
          path: "team",
        },
      });

    if (!user) {
      throw new Error("user not profile");
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      leagueRank: user.leagueRank,
      points: user.points,
      exactBetCount: user.exactBetCount,
      winner: user.winner
        ? { name: user.winner.name, id: user.winner.id }
        : null,
      topScorer: user.topScorer
        ? {
            name: user.topScorer.name,
            id: user.topScorer.id,
            team: user.topScorer.team,
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
  const { winnerId, topScorerId } = Object.fromEntries(formData);

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
    await connectDB();
    const userId = await getCurrentUserId();

    await User.findByIdAndUpdate(userId, {
      winner: winnerId,
      topScorer: topScorerId,
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update profile");
  }
};
