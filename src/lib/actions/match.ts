"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../../../config/database";
import { IMatch, Match } from "../models/match";
import { RequestState } from "./state";
import { MatchDay } from "../models/matchDay";

const calculatePointsAndUpdateUser = async (
  bet: any,
  firstTeamResult: any,
  secondTeamResult: any,
) => {
  let points = 0;
  // TODO z dupy do zmiany

  const { bonus } = bet.result;

  const ratio = bonus ? 2 : 1;

  if (
    (bet.result.firstTeamResult > bet.result.secondTeamResult &&
      firstTeamResult > secondTeamResult) ||
    (bet.result.firstTeamResult < bet.result.secondTeamResult &&
      firstTeamResult < secondTeamResult) ||
    (bet.result.firstTeamResult === bet.result.secondTeamResult &&
      firstTeamResult === secondTeamResult)
  ) {
    points = 1 * ratio;
  }

  if (
    bet.result.firstTeamResult === firstTeamResult &&
    bet.result.secondTeamResult === secondTeamResult
  ) {
    // tutaj bylo 3?
    points * 3;
    bet.isExact = true;
  }

  bet.points = points;
  await bet.save();

  const user = await User.findById(bet.user).exec();

  user.points += points;
  await user.save();
};

export const getMatches = async (matchDayId: string): Promise<IMatch[]> => {
  try {
    await connectDB();
    const matches = await Match.find({ matchDay: matchDayId })
      .sort({ start: 1 })
      .populate("firstTeam")
      .populate("secondTeam")
      .lean();

    return matches.map((match) => {
      return {
        id: match._id,
        firstTeam: match.firstTeam,
        secondTeam: match.secondTeam,
        start: match.start,
        finalResult: match.finalResult,
      };
    }) as unknown as IMatch[];
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch matches");
  }
};

export const getMatch = async (matchId: string): Promise<IMatch> => {
  try {
    await connectDB();
    const match = await Match.findById(matchId)
      .populate("firstTeam")
      .populate("secondTeam")
      .populate("matchDay");
    if (!match) {
      throw new Error("Match not found");
    }
    return match;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch match");
  }
};

export const createMatch = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { firstTeam, secondTeam, matchDay, start } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const newMatch = new Match({
      firstTeam,
      secondTeam,
      matchDay,
      start,
    });
    await newMatch.save();

    await MatchDay.findByIdAndUpdate(matchDay, {
      $push: { matches: newMatch._id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to create match");
  }
};

import { Bet } from "../models/bet";
import { User } from "../models/user";

export const editMatch = async (
  previousState: RequestState | undefined,
  formData: FormData,
): Promise<RequestState> => {
  const { id, firstTeamResult, secondTeamResult } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const match = await Match.findByIdAndUpdate(id, {
      finalResult: { firstTeamResult, secondTeamResult },
    });
    await match.save();

    // Fetch all bets for the match
    const bets = await Bet.find({ match: id }).exec();

    // Calculate points for each bet and update user points
    for (const bet of bets) {
      await calculatePointsAndUpdateUser(
        bet,
        firstTeamResult,
        secondTeamResult,
      );
    }

    revalidatePath("/admin/rounds/[roundId]/matchDays/[matchDayId]");
    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("failed to finish match");
  }
};
