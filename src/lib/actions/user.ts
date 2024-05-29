import connectDB from "../../../config/database";
import { IUser, User } from "../models/user";

export const getUsers = async (): Promise<Partial<IUser[]>> => {
  try {
    await connectDB();
    const users = await User.find()
      .sort({ leagueRank: -1 })
      .populate({
        path: "topScorer",
        populate: {
          path: "team",
        },
      })
      .populate("winner")
      .lean();

    return users.map((user) => {
      return {
        id: user._id,
        username: user.username,
        points: user.points,
        leagueRank: user.leagueRank,
        exactBetCount: user.exactBetCount,
        winner: user.winner,
        topScorer: user.topScorer,
      } as IUser;
    });
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch users");
  }
};
