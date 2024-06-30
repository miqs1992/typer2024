import { AdminService } from "@/modules/admin/admin-service";
import { MatchManagementService } from "@/modules/admin/round-match-management/match-management.service";
import { Bet, IBet } from "@/lib/models/bet";
import { User } from "@/lib/models/user";
import { MatchDay } from "@/lib/models/matchDay";

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

      const bets: IBet[] = await Bet.find({ match: match.id }).lean();

      for (const bet of bets) {
        let points = 0;
        let isExact = false;
        const betWinner = this.getWinner(
          bet.result.firstTeamResult,
          bet.result.secondTeamResult,
        );

        if (matchWinner === betWinner) {
          if (
            match.firstTeamScore === bet.result.firstTeamResult &&
            match.secondTeamScore === bet.result.secondTeamResult
          ) {
            points = 3.0;
            isExact = true;
          } else {
            points = 1.0;
          }

          if (bet.result.bonus) {
            points *= 2.0;
          }

          points *= scoreFactor;
        }

        await Bet.findByIdAndUpdate(bet._id, { points, isExact });
      }

      await this.recalculateUsers();
    }
  }

  public async recalculateUsers(): Promise<void> {
    const bets = await Bet.find().where({ points: { $gte: 0 } });

    const results: {
      [key: string]: { points: number; exactBetCount: number };
    } = bets.reduce((acc, bet) => {
      const userId = bet.user.toString();
      const value = acc[userId] || { points: 0, exactBetCount: 0 };
      value.points += bet.points;
      value.exactBetCount += bet.isExact ? 1 : 0;
      acc[userId] = value;
      return acc;
    }, {});

    const sortedUsers = Object.entries(results).sort((a, b) => {
      if (b[1].points !== a[1].points) {
        return b[1].points - a[1].points;
      } else {
        return b[1].exactBetCount - a[1].exactBetCount;
      }
    });

    for (let i = 0; i < sortedUsers.length; i++) {
      const [userId, { points, exactBetCount }] = sortedUsers[i];
      await User.findByIdAndUpdate(userId, {
        points,
        exactBetCount,
        leagueRank: i + 1,
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
    const matchDay = await MatchDay.findById(matchDayId).populate("round");
    if (!matchDay) {
      throw new Error(`Round not found for match day ${matchDayId}`);
    }
    return Number(matchDay.round.scoreFactor);
  }
}
