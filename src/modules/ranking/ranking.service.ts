import { NonAdminService } from "@/modules/non-admin-service";
import { User, userJoiSchema } from "@/lib/models/user";
import { ServiceError } from "@/modules/service.error";
import { hashPassword } from "@/tools/password";
import { MatchDay } from "@/lib/models/matchDay";
import { Bet } from "@/lib/models/bet";
import { UserBet } from "@/modules/betting/betting.service";
import { Round } from "@/lib/models/round";

export interface TeamData {
  name: string;
  flag: string;
}

interface TopScorerData {
  name: string;
  team: TeamData;
}

export interface ShortUserData {
  id: string;
  username: string;
  points: number;
  exactBetCount: number;
}

export interface RankedUserData extends ShortUserData {
  winner: TeamData;
  leagueRank: number;
  topScorer: TopScorerData;
}

export class RankingService extends NonAdminService {
  public async getRanking(): Promise<RankedUserData[]> {
    let users;

    try {
      users = await User.find()
        .sort({ leagueRank: -1 })
        .populate({
          path: "topScorer",
          populate: {
            path: "team",
          },
        })
        .populate("winner")
        .lean();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to get ranking ${this.getUserId()}`);
    }

    return users
      .map((user) => {
        return {
          id: user.id,
          username: user.username,
          points: user.points,
          leagueRank: user.leagueRank,
          exactBetCount: user.exactBetCount,
          winner: user.winner,
          topScorer: user.topScorer,
        };
      })
      .sort((a, b) => a.leagueRank - b.leagueRank);
  }

  public async getRoundRanking(roundId: string): Promise<ShortUserData[]> {
    let users;

    try {
      const matchDays = await MatchDay.find({ round: roundId });
      const bets = await Bet.find({
        matchDay: { $in: matchDays.map((matchDay) => matchDay.id) },
      }).populate("user");

      users = bets
        .filter((bet) => bet.user)
        .reduce((acc: ShortUserData[], bet) => {
          const userData = acc.find(
            (data: ShortUserData) => data.id === bet.user.id.toString(),
          );
          if (userData) {
            userData.points += bet.points;
            userData.exactBetCount += bet.isExact ? 1 : 0;
          } else {
            acc.push({
              id: bet.user.id.toString(),
              username: bet.user.username,
              points: bet.points,
              exactBetCount: bet.isExact ? 1 : 0,
            });
          }
          return acc;
        }, [] as ShortUserData[]);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to get ranking for round ${roundId}`);
    }

    return users.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else {
        return b.exactBetCount - a.exactBetCount;
      }
    });
  }
}
