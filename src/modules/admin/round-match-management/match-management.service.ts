import { AdminService } from "@/modules/admin/admin-service";
import {
  Match,
  matchManagementJoiSchema,
  matchResultJoiSchema,
} from "@/lib/models/match";
import { ServiceError } from "@/modules/service.error";

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
      match = await Match.findById(matchId)
        .populate("firstTeam")
        .populate("secondTeam");
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch match ${matchId}`);
    }

    if (!match) {
      throw new ServiceError("Match not found");
    }

    return this.parseMatch(match);
  }

  public getMatchesInDay(matchDayId: string): Promise<PersistedMatch[]> {
    return Match.find({ matchDay: matchDayId })
      .sort({ start: 1 })
      .populate("firstTeam")
      .populate("secondTeam")
      .then((matches) => {
        return matches.map((match) => this.parseMatch(match));
      });
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

    const newMatch = new Match(value);

    try {
      await newMatch.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new match");
    }

    return this.parseMatch(newMatch);
  }

  public async updateMatch(
    matchId: string,
    formData: FormData,
  ): Promise<PersistedMatch> {
    const { firstTeamId, secondTeamId, start } = Object.fromEntries(formData);

    const existingMatch = await Match.findById(matchId);

    if (!existingMatch) {
      throw new ServiceError("Match not found");
    }

    const { value, error } = matchManagementJoiSchema.validate({
      firstTeam: firstTeamId,
      secondTeam: secondTeamId,
      start,
      matchDay: existingMatch.matchDay.toString(),
    });

    if (error) {
      console.log(value, "value");
      throw new ServiceError(error.message);
    }

    const match = await Match.findByIdAndUpdate(matchId, value);

    try {
      await match.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match ${matchId}`);
    }

    return this.parseMatch(match);
  }

  public async setMatchResult(
    matchId: string,
    formData: FormData,
  ): Promise<PersistedMatch> {
    const { firstTeamResult, secondTeamResult } = Object.fromEntries(formData);

    const existingMatch = await Match.findById(matchId);

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

    const match = await Match.findByIdAndUpdate(matchId, {
      finalResult: value,
    });

    try {
      await match.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match ${matchId}`);
    }

    // TODO: recalculate user scores

    return this.parseMatch(match);
  }

  private parseMatch(match: any): PersistedMatch {
    return {
      id: match.id,
      matchDayId: match.matchDay.toString(),
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
      firstTeamScore: match.finalResult.firstTeamResult,
      secondTeamScore: match.finalResult.secondTeamResult,
    };
  }
}
