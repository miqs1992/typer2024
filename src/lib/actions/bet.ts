"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../../../config/database";
import { Bet, IBet } from "../models/bet";
import { Match, IMatch } from "../models/match";
import { RequestState } from "./state";

export const updateBets = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { betList } = Object.fromEntries(formData) as any;

  const parsedBetList = JSON.parse(betList);

  try {
    await connectDB();
    await Promise.all(
      parsedBetList.map(async (bet: any) => {
        await Bet.findByIdAndUpdate(
          bet.betId,
          {
            result: {
              firstTeamResult: bet.match.firstTeam.result || 0,
              secondTeamResult: bet.match.secondTeam.result || 0,
              bonus: bet.withBonus || false,
            },
          },
          { new: true },
        );
      }),
    );
    revalidatePath("/");
    return { message: "Bets updated correctly." };
  } catch (error) {
    throw new Error("Failed to update bet");
  }
};

export const getBets = async (
  matchDayId: string,
  userId: string,
): Promise<IBet[]> => {
  try {
    await connectDB();
    let bets = (await Bet.find({ matchDay: matchDayId, user: userId }).populate(
      {
        path: "match",
        populate: {
          path: "firstTeam secondTeam",
        },
      },
    )) as IBet[];

    // Create bets
    const matches = await Match.find({ matchDay: matchDayId });
    const matchesWithoutBets: IMatch[] = matches.filter(
      (match) => !bets.some((bet) => bet.match.id === match.id),
    );

    const newBets = await Promise.all(
      matchesWithoutBets.map((match) => {
        const bet = new Bet({
          matchDay: matchDayId,
          match: match.id,
          user: userId,
          result: { firstTeamResult: 0, secondTeamResult: 0 },
          points: 0,
          isExact: false,
          withBonus: false,
        });

        return bet.save();
      }),
    );

    bets = bets.concat(newBets);

    bets = (await Bet.populate(bets, {
      path: "match",
      populate: {
        path: "firstTeam secondTeam",
      },
    })) as IBet[];
    revalidatePath("/");

    return bets;
  } catch (error) {
    throw new Error("failed to fetch bets");
  }
};

export const getAllBetsForMatch = async (matchId: string): Promise<IBet[]> => {
  try {
    await connectDB();
    return await Bet.find({ match: matchId }).populate("user");
  } catch (error) {
    throw new Error("failed to fetch bets");
  }
};

export const hasUserSetBonusInThisRound = async (
  matchDayId: string,
  roundId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await connectDB();

    const bets = await Bet.find({ user: userId });
    const matches = await Match.find({ round: roundId });

    const matchIds = matches.map((match) => match.id);
    const betsForRound = bets.filter((bet) =>
      matchIds.includes(bet.match.toString()),
    );

    return betsForRound.some(
      (bet) => bet.result.bonus && bet.matchDay.toString() !== matchDayId,
    );
  } catch (error) {
    throw new Error("failed to fetch bonus");
  }
};
