import { NonAdminService } from "@/modules/non-admin-service";
import { PersistedMatchDay } from "@/modules/admin/round-match-management/match-day-management.service";
import { ServiceError } from "@/modules/service.error";
import { betResultJoiSchema } from "@/lib/models/bet";
import { prisma } from "@/lib/prisma";

interface PersistedTeam {
  name: string;
  flag: string;
}

interface PersistedUser {
  id: string;
  name: string;
}

export interface PersistedMatch {
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

export interface UserBet {
  user: PersistedUser;
  bets: {
    id: string;
    points: number;
    isExact: boolean;
    matchId: string;
    firstTeamResult: number;
    secondTeamResult: number;
    bonus: boolean;
  }[];
}
export interface PastMatchDayHistory {
  matches: PersistedMatch[];
  userBets: UserBet[];
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

    const otherMatchDays = await prisma.matchDay.findMany({
      where: { roundId: matchDay.roundId, id: { not: matchDay.id } },
    });

    const bets = await prisma.bet.findMany({
      where: {
        matchDayId: { in: otherMatchDays.map((md) => md.id) },
        userId: this.getUserId(),
      },
    });

    return !bets.some((bet) => bet.bonus);
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

    const validatedBets: UpdateBetPayload[] = [];

    for (const betPayload of payload) {
      const bet = await prisma.bet.findFirst({
        where: {
          id: betPayload.id,
          userId: this.getUserId(),
          matchDayId,
        },
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

      validatedBets.push({
        id: betPayload.id,
        firstTeamResult: value.firstTeamResult,
        secondTeamResult: value.secondTeamResult,
        bonus: value.bonus ?? false,
      });
    }

    await Promise.all(
      validatedBets.map(({ id, firstTeamResult, secondTeamResult, bonus }) =>
        prisma.bet.update({
          where: { id },
          data: { firstTeamResult, secondTeamResult, bonus },
        }),
      ),
    );
  }

  public async getAllBetsInPastMatchDay(
    matchDayId: string,
  ): Promise<PastMatchDayHistory> {
    const matchDay = await this.getMatchDayById(matchDayId);

    if (matchDay.stopBetTime >= new Date()) {
      throw new ServiceError("Cannot get bets for future match day");
    }

    const matches = await prisma.match.findMany({
      where: { matchDayId },
      orderBy: { start: "asc" },
      include: { firstTeam: true, secondTeam: true },
    });

    const bets = await prisma.bet.findMany({
      where: { matchDayId },
      include: { user: true },
    });

    return {
      matches: matches.map((match) => this.parseMatch(match)),
      userBets: bets
        .filter((bet) => bet.user)
        .reduce((acc: UserBet[], bet) => {
          const userBets = acc.find(
            (userBet: UserBet) => userBet.user.id === bet.user.id,
          );
          if (userBets) {
            userBets.bets.push({
              id: bet.id,
              points: bet.points ?? 0,
              isExact: bet.isExact ?? false,
              matchId: bet.matchId,
              firstTeamResult: bet.firstTeamResult,
              secondTeamResult: bet.secondTeamResult,
              bonus: bet.bonus,
            });
          } else {
            acc.push({
              user: {
                id: bet.user.id,
                name: bet.user.username,
              },
              bets: [
                {
                  id: bet.id,
                  points: bet.points ?? 0,
                  isExact: bet.isExact ?? false,
                  matchId: bet.matchId,
                  firstTeamResult: bet.firstTeamResult,
                  secondTeamResult: bet.secondTeamResult,
                  bonus: bet.bonus,
                },
              ],
            });
          }
          return acc;
        }, [] as UserBet[]),
    };
  }

  private async getMatchDayById(
    matchDayId: string,
  ): Promise<PersistedMatchDay> {
    const matchDay = await prisma.matchDay.findUnique({
      where: { id: matchDayId },
    });

    if (!matchDay) {
      throw new ServiceError("Match day not found");
    }

    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.roundId,
    };
  }

  private async ensureBetsForMatchDay(matchDayId: string): Promise<void> {
    const existingBets = await prisma.bet.findMany({
      where: { matchDayId, userId: this.getUserId() },
    });
    const existingMatchIds = existingBets.map((bet) => bet.matchId);

    const matchesWithoutBets = await prisma.match.findMany({
      where: { matchDayId, id: { notIn: existingMatchIds } },
    });

    if (matchesWithoutBets.length === 0) {
      return;
    }

    await Promise.all(
      matchesWithoutBets.map((match) =>
        prisma.bet.create({
          data: {
            matchDayId,
            matchId: match.id,
            userId: this.getUserId()!,
            firstTeamResult: 0,
            secondTeamResult: 0,
            bonus: false,
            points: 0,
            isExact: false,
          },
        }),
      ),
    );
  }

  private async getBetsForMatchDay(
    matchDayId: string,
    userId: string,
  ): Promise<PersistedBet[]> {
    const bets = await prisma.bet.findMany({
      where: { matchDayId, userId },
      include: {
        match: { include: { firstTeam: true, secondTeam: true } },
        user: true,
      },
    });

    return bets
      .map((bet) => ({
        id: bet.id,
        user: {
          id: bet.user.id,
          name: bet.user.username,
        },
        match: this.parseMatch(bet.match),
        matchDayId: bet.matchDayId,
        bonus: bet.bonus,
        result: {
          bonus: bet.bonus,
          firstTeamResult: bet.firstTeamResult,
          secondTeamResult: bet.secondTeamResult,
        },
        points: bet.points ?? 0,
        isExact: bet.isExact ?? false,
      }))
      .sort(
        (a: PersistedBet, b: PersistedBet) =>
          new Date(b.match.start).getTime() - new Date(a.match.start).getTime(),
      );
  }

  private parseMatch(match: {
    id: string;
    firstTeam: PersistedTeam;
    secondTeam: PersistedTeam;
    start: Date;
    firstTeamResult: number | null;
    secondTeamResult: number | null;
  }): PersistedMatch {
    return {
      id: match.id,
      firstTeam: {
        name: match.firstTeam.name,
        flag: match.firstTeam.flag,
      },
      secondTeam: {
        name: match.secondTeam.name,
        flag: match.secondTeam.flag,
      },
      start: match.start,
      firstTeamResult: match.firstTeamResult,
      secondTeamResult: match.secondTeamResult,
    };
  }
}
