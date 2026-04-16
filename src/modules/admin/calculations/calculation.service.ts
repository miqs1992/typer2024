import { AdminService } from "@/modules/admin/admin-service";
import { MatchManagementService } from "@/modules/admin/round-match-management/match-management.service";
import { prisma } from "@/lib/prisma";

type Winner = "first" | "second" | "draw";

export class CalculationService extends AdminService {
  public async calculateDayResults(matchDayId: string): Promise<void> {
    const matchService = new MatchManagementService(this.session);
    const matches = await matchService.getMatchesInDay(matchDayId);
    const scoreFactor = await this.getScoreFactor(matchDayId);

    console.log(
      `Calculating results for ${matches.length} matches with factor ${scoreFactor}`,
    );

    for (const match of matches) {
      if (match.firstTeamScore === null || match.secondTeamScore === null) {
        console.log(`Match ${match.id} has no result`);
        continue;
      }

      const matchWinner = this.getWinner(
        match.firstTeamScore,
        match.secondTeamScore,
      );

      const bets = await prisma.bet.findMany({ where: { matchId: match.id } });

      for (const bet of bets) {
        let points = 0;
        let isExact = false;
        const betWinner = this.getWinner(
          bet.firstTeamResult,
          bet.secondTeamResult,
        );

        if (matchWinner === betWinner) {
          if (
            match.firstTeamScore === bet.firstTeamResult &&
            match.secondTeamScore === bet.secondTeamResult
          ) {
            points = 3.0;
            isExact = true;
          } else {
            points = 1.0;
          }

          if (bet.bonus) {
            points *= 2.0;
          }

          points *= scoreFactor;
        }

        await prisma.bet.update({
          where: { id: bet.id },
          data: { points, isExact },
        });
      }
    }

    await this.recalculateUsers();
  }

  public async recalculateUsers(): Promise<void> {
    console.log(`Recalculating users`);

    const bets = await prisma.bet.findMany({
      where: { points: { gte: 0 } },
    });

    const results: {
      [key: string]: { points: number; exactBetCount: number };
    } = bets.reduce(
      (
        acc: { [key: string]: { points: number; exactBetCount: number } },
        bet,
      ) => {
        const userId = bet.userId;
        const value = acc[userId] || { points: 0, exactBetCount: 0 };
        value.points += bet.points ?? 0;
        value.exactBetCount += bet.isExact ? 1 : 0;
        acc[userId] = value;
        return acc;
      },
      {},
    );

    const winner = await prisma.team.findFirst({ where: { winner: true } });
    if (winner) {
      const users = await prisma.user.findMany({
        where: { winnerId: winner.id },
      });
      for (const user of users) {
        results[user.id] = {
          points: (results[user.id]?.points ?? 0) + 7.0,
          exactBetCount: results[user.id]?.exactBetCount ?? 0,
        };
      }
    }

    const king = await prisma.player.findFirst({ where: { king: true } });
    if (king) {
      const users = await prisma.user.findMany({
        where: { topScorerId: king.id },
      });
      for (const user of users) {
        results[user.id] = {
          points: (results[user.id]?.points ?? 0) + 5.0,
          exactBetCount: results[user.id]?.exactBetCount ?? 0,
        };
      }
    }

    const sortedUsers = Object.entries(results).sort((a, b) => {
      if (b[1].points !== a[1].points) {
        return b[1].points - a[1].points;
      } else {
        return b[1].exactBetCount - a[1].exactBetCount;
      }
    });

    for (let i = 0; i < sortedUsers.length; i++) {
      const [userId, { points, exactBetCount }] = sortedUsers[i];
      await prisma.user.update({
        where: { id: userId },
        data: { points, exactBetCount, leagueRank: i + 1 },
      });
    }
  }

  private getWinner(firstTeamScore: number, secondTeamScore: number): Winner {
    if (firstTeamScore > secondTeamScore) {
      return "first";
    }

    if (firstTeamScore < secondTeamScore) {
      return "second";
    }

    return "draw";
  }

  private async getScoreFactor(matchDayId: string): Promise<number> {
    const matchDay = await prisma.matchDay.findUnique({
      where: { id: matchDayId },
      include: { round: true },
    });
    if (!matchDay) {
      throw new Error(`Round not found for match day ${matchDayId}`);
    }
    return Number(matchDay.round.scoreFactor);
  }
}
