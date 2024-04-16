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
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to update bet");
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
    console.log(error);
    throw new Error("failed to fetch bets");
  }
};
