import { NonAdminService } from "@/modules/non-admin-service";
import { MatchDay } from "@/lib/models/matchDay";
import { ServiceError } from "@/modules/service.error";

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

  private parseMatchDay(matchDay: any): PublicMatchDay {
    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.round.toString(),
    };
  }
}
