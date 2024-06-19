import { NonAdminService } from "@/modules/non-admin-service";
import { PersistedMatchDay } from "@/modules/admin/round-match-management/match-day-management.service";
import { MatchDay } from "@/lib/models/matchDay";
import { ServiceError } from "@/modules/service.error";
import { Bet, betResultJoiSchema } from "@/lib/models/bet";
import { Match } from "@/lib/models/match";

interface PersistedTeam {
  name: string;
  flag: string;
}

interface PersistedUser {
  id: string;
  name: string;
}

interface PersistedMatch {
  id: string;
  firstTeam: PersistedTeam;
  secondTeam: PersistedTeam;
  start: Date;
  firstTeamResult: number | null;
  secondTeamResult: number | null;
}

export interface PersistedBet {
  id: string;
  user: PersistedUser;
  matchDayId: string;
  match: PersistedMatch;
  points: number;
  isExact: boolean;
  result: {
    firstTeamResult: number;
    secondTeamResult: number;
    bonus: boolean;
  };
}

export interface UpdateBetPayload {
  id: string;
  firstTeamResult: number;
  secondTeamResult: number;
  bonus: boolean;
}

export class BettingService extends NonAdminService {
  public async getMyBetsForFutureMatchDay(
    matchDayId: string,
  ): Promise<PersistedBet[]> {
    const matchDay = await this.getMatchDayById(matchDayId);

    if (matchDay.stopBetTime < new Date()) {
      throw new ServiceError(
        `Cannot get my bets for past match day. Stop Bet Time: ${matchDay.stopBetTime.toISOString()}, current time: ${new Date().toISOString()}`,
      );
    }

    await this.ensureBetsForMatchDay(matchDayId);

    return this.getBetsForMatchDay(matchDayId, this.getUserId()!);
  }

  public async getMyBetsForPastMatchDay(
    matchDayId: string,
  ): Promise<PersistedBet[]> {
    const matchDay = await this.getMatchDayById(matchDayId);

    if (matchDay.stopBetTime >= new Date()) {
      throw new ServiceError(
        `Cannot get my bets for future match day. Stop Bet Time: ${matchDay.stopBetTime.toISOString()}, current time: ${new Date().toISOString()}`,
      );
    }

    return this.getBetsForMatchDay(matchDayId, this.getUserId()!);
  }

  public async isBonusAvailableForMatchDay(
    matchDayId: string,
  ): Promise<boolean> {
    const matchDay = await this.getMatchDayById(matchDayId);

    const otherMatchDays = await MatchDay.find({
      round: matchDay.roundId,
      _id: { $ne: matchDay.id },
    });

    const bets = await Bet.find({
      matchDay: { $in: otherMatchDays.map((md) => md.id) },
      user: this.getUserId(),
    });

    return !bets.some((bet) => bet.result.bonus);
  }

  public async updateBets(matchDayId: string, payload: UpdateBetPayload[]) {
    const matchDay = await this.getMatchDayById(matchDayId);

    if (matchDay.stopBetTime < new Date()) {
      throw new ServiceError("Cannot update bets for past match day");
    }

    if (payload.some((bet) => bet.bonus)) {
      if (!(await this.isBonusAvailableForMatchDay(matchDayId))) {
        throw new ServiceError("Bonus already used");
      }
    }

    const betsToSave = [];

    for (const betPayload of payload) {
      const bet = await Bet.findOne({
        _id: betPayload.id,
        user: this.getUserId(),
        matchDay: matchDayId,
      });

      if (!bet) {
        throw new ServiceError("Bet not found");
      }

      const { value, error } = betResultJoiSchema.validate({
        firstTeamResult: betPayload.firstTeamResult,
        secondTeamResult: betPayload.secondTeamResult,
        bonus: betPayload.bonus,
      });

      if (error) {
        throw new ServiceError(error.message);
      }

      bet.result = value;
      betsToSave.push(bet);
    }

    await Promise.all(betsToSave.map((bet) => bet.save()));
  }

  private async getMatchDayById(
    matchDayId: string,
  ): Promise<PersistedMatchDay> {
    const matchDay = await MatchDay.findById(matchDayId);

    if (!matchDay) {
      throw new ServiceError("Match day not found");
    }

    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.round.toString(),
    };
  }

  private async ensureBetsForMatchDay(matchDayId: string): Promise<void> {
    const existingBets = await Bet.find({
      matchDay: matchDayId,
      user: this.getUserId(),
    });
    const existingMatchIds: string[] = existingBets.map((bet) =>
      bet.match.toString(),
    );
    const matchesWithoutBets = await Match.find({
      matchDay: matchDayId,
      _id: { $nin: existingMatchIds },
    });

    if (matchesWithoutBets.length === 0) {
      return;
    }

    await Promise.all(
      matchesWithoutBets.map((match) => {
        const bet = new Bet({
          matchDay: matchDayId,
          match: match.id,
          user: this.getUserId(),
          result: { firstTeamResult: 0, secondTeamResult: 0, bonus: false },
          points: 0,
          isExact: false,
          withBonus: false,
        });

        return bet.save();
      }),
    );
  }

  private async getBetsForMatchDay(
    matchDayId: string,
    userId: string,
  ): Promise<PersistedBet[]> {
    const bets = await Bet.find({ matchDay: matchDayId, user: userId })
      .populate({
        path: "match",
        populate: {
          path: "firstTeam secondTeam",
        },
      })
      .populate("user");

    return bets
      .map((bet) => ({
        id: bet.id,
        user: {
          id: bet.user.id.toString(),
          name: bet.user.username,
        },
        match: {
          id: bet.match.id.toString(),
          firstTeam: {
            name: bet.match.firstTeam.name,
            flag: bet.match.firstTeam.flag,
          },
          secondTeam: {
            name: bet.match.secondTeam.name,
            flag: bet.match.secondTeam.flag,
          },
          start: bet.match.start,
          firstTeamResult: bet.match.finalResult.firstTeamResult,
          secondTeamResult: bet.match.finalResult.secondTeamResult,
        },
        matchDayId: bet.matchDay.toString(),
        bonus: bet.result.bonus,
        result: {
          bonus: bet.result.bonus,
          firstTeamResult: bet.result.firstTeamResult,
          secondTeamResult: bet.result.secondTeamResult,
        },
        points: bet.points,
        isExact: bet.isExact,
      }))
      .sort(
        (a: PersistedBet, b: PersistedBet) =>
          new Date(b.match.start).getTime() - new Date(a.match.start).getTime(),
      );
  }
}
