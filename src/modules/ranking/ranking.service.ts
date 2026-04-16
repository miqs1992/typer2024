import { NonAdminService } from "@/modules/non-admin-service";
import { ServiceError } from "@/modules/service.error";
import { prisma } from "@/lib/prisma";

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
      users = await prisma.user.findMany({
        orderBy: { leagueRank: "asc" },
        include: {
          topScorer: { include: { team: true } },
          winner: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to get ranking ${this.getUserId()}`);
    }

    return users.map((user) => ({
      id: user.id,
      username: user.username,
      points: user.points,
      leagueRank: user.leagueRank,
      exactBetCount: user.exactBetCount,
      winner: user.winner as TeamData,
      topScorer: user.topScorer as TopScorerData,
    }));
  }

  public async getRoundRanking(roundId: string): Promise<ShortUserData[]> {
    let users;

    try {
      const matchDays = await prisma.matchDay.findMany({
        where: { roundId },
      });
      const bets = await prisma.bet.findMany({
        where: { matchDayId: { in: matchDays.map((md) => md.id) } },
        include: { user: true },
      });

      users = bets
        .filter((bet) => bet.user)
        .reduce((acc: ShortUserData[], bet) => {
          const userData = acc.find((data) => data.id === bet.user.id);
          if (userData) {
            userData.points += bet.points ?? 0;
            userData.exactBetCount += bet.isExact ? 1 : 0;
          } else {
            acc.push({
              id: bet.user.id,
              username: bet.user.username,
              points: bet.points ?? 0,
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
