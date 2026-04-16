import { AdminService } from "@/modules/admin/admin-service";
import {
  matchManagementJoiSchema,
  matchResultJoiSchema,
} from "@/lib/models/match";
import { ServiceError } from "@/modules/service.error";
import { prisma } from "@/lib/prisma";

export interface PersistedTeam {
  id: string;
  name: string;
  flag: string;
}

export interface PersistedMatch {
  id: string;
  matchDayId: string;
  firstTeam: PersistedTeam;
  secondTeam: PersistedTeam;
  start: Date;
  firstTeamScore: number | null;
  secondTeamScore: number | null;
}

export class MatchManagementService extends AdminService {
  public async getMatch(matchId: string): Promise<PersistedMatch> {
    let match;

    try {
      match = await prisma.match.findUnique({
        where: { id: matchId },
        include: { firstTeam: true, secondTeam: true },
      });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch match ${matchId}`);
    }

    if (!match) {
      throw new ServiceError("Match not found");
    }

    return this.parseMatch(match);
  }

  public async getMatchesInDay(matchDayId: string): Promise<PersistedMatch[]> {
    const matches = await prisma.match.findMany({
      where: { matchDayId },
      orderBy: { start: "asc" },
      include: { firstTeam: true, secondTeam: true },
    });
    return matches.map((match) => this.parseMatch(match));
  }

  public async createNewMatch(formData: FormData): Promise<PersistedMatch> {
    const { firstTeamId, secondTeamId, matchDayId, start } =
      Object.fromEntries(formData);

    const { value, error } = matchManagementJoiSchema.validate({
      firstTeam: firstTeamId,
      secondTeam: secondTeamId,
      start,
      matchDay: matchDayId,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      const match = await prisma.match.create({
        data: {
          firstTeamId: value.firstTeam,
          secondTeamId: value.secondTeam,
          matchDayId: value.matchDay,
          start: new Date(value.start),
        },
        include: { firstTeam: true, secondTeam: true },
      });
      return this.parseMatch(match);
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new match");
    }
  }

  public async updateMatch(
    matchId: string,
    formData: FormData,
  ): Promise<PersistedMatch> {
    const { firstTeamId, secondTeamId, start } = Object.fromEntries(formData);

    const existingMatch = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!existingMatch) {
      throw new ServiceError("Match not found");
    }

    const { value, error } = matchManagementJoiSchema.validate({
      firstTeam: firstTeamId,
      secondTeam: secondTeamId,
      start,
      matchDay: existingMatch.matchDayId,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      const match = await prisma.match.update({
        where: { id: matchId },
        data: {
          firstTeamId: value.firstTeam,
          secondTeamId: value.secondTeam,
          start: new Date(value.start),
        },
        include: { firstTeam: true, secondTeam: true },
      });
      return this.parseMatch(match);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match ${matchId}`);
    }
  }

  public async setMatchResult(
    matchId: string,
    formData: FormData,
  ): Promise<PersistedMatch> {
    const { firstTeamResult, secondTeamResult } = Object.fromEntries(formData);

    const existingMatch = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!existingMatch) {
      throw new ServiceError("Match not found");
    }

    const { value, error } = matchResultJoiSchema.validate({
      firstTeamResult,
      secondTeamResult,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      const match = await prisma.match.update({
        where: { id: matchId },
        data: {
          firstTeamResult: value.firstTeamResult,
          secondTeamResult: value.secondTeamResult,
        },
        include: { firstTeam: true, secondTeam: true },
      });

      // TODO: recalculate user scores

      return this.parseMatch(match);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match ${matchId}`);
    }
  }

  public async removeMatch(matchId: string): Promise<void> {
    try {
      // Bets are cascade-deleted via schema onDelete: Cascade
      await prisma.match.delete({ where: { id: matchId } });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove match  ${matchId}`);
    }
  }

  private parseMatch(match: {
    id: string;
    matchDayId: string;
    firstTeam: PersistedTeam;
    secondTeam: PersistedTeam;
    start: Date;
    firstTeamResult: number | null;
    secondTeamResult: number | null;
  }): PersistedMatch {
    return {
      id: match.id,
      matchDayId: match.matchDayId,
      firstTeam: {
        id: match.firstTeam.id,
        name: match.firstTeam.name,
        flag: match.firstTeam.flag,
      },
      secondTeam: {
        id: match.secondTeam.id,
        name: match.secondTeam.name,
        flag: match.secondTeam.flag,
      },
      start: match.start,
      firstTeamScore: match.firstTeamResult,
      secondTeamScore: match.secondTeamResult,
    };
  }
}
