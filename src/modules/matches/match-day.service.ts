import { NonAdminService } from "@/modules/non-admin-service";
import { MatchDay } from "@/lib/models/matchDay";
import { ServiceError } from "@/modules/service.error";
import { Match } from "@/lib/models/match";
import { PersistedMatch } from "@/modules/admin/round-match-management/match-management.service";

export interface PublicMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  roundId: string;
}

export enum MatchDayTimeframe {
  Current = "Current",
  Previous = "Previous",
}

export class MatchDayService extends NonAdminService {
  public async getAllMatchDays(): Promise<PublicMatchDay[]> {
    try {
      const days = await MatchDay.find().sort({ dayNumber: 1 });
      return days.map((matchDay) => this.parseMatchDay(matchDay));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch all match days");
    }
  }

  public async getMatchDayById(id: string): Promise<PublicMatchDay> {
    let matchDay;
    try {
      matchDay = await MatchDay.findById(id);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch match day with id: ${id}`);
    }

    if (!matchDay) throw new ServiceError(`Match day with id: ${id} not found`);

    return this.parseMatchDay(matchDay);
  }

  public async getMatchDayByTimeframe(
    type: MatchDayTimeframe,
  ): Promise<PublicMatchDay | null> {
    const now = new Date();
    let matchDay;
    try {
      switch (type) {
        case MatchDayTimeframe.Current:
          matchDay = await MatchDay.findOne({
            stopBetTime: { $gte: now },
          }).sort({
            stopBetTime: 1,
          });
          break;
        default:
          matchDay = await MatchDay.findOne({ stopBetTime: { $lt: now } }).sort(
            {
              stopBetTime: -1,
            },
          );
          break;
      }
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch ${type} match day`);
    }

    return matchDay ? this.parseMatchDay(matchDay) : null;
  }

  public async getMatchesInDay(matchDayId: string): Promise<PersistedMatch[]> {
    return Match.find({ matchDay: matchDayId })
      .sort({ start: 1 })
      .populate("firstTeam")
      .populate("secondTeam")
      .then((matches) => {
        return matches.map((match) => this.parseMatch(match));
      });
  }

  private parseMatchDay(matchDay: any): PublicMatchDay {
    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.round.toString(),
    };
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
