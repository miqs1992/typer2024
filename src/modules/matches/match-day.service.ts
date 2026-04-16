import { NonAdminService } from "@/modules/non-admin-service";
import { ServiceError } from "@/modules/service.error";
import { prisma } from "@/lib/prisma";

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
      const days = await prisma.matchDay.findMany({
        orderBy: { dayNumber: "asc" },
      });
      return days.map((matchDay) => this.parseMatchDay(matchDay));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch all match days");
    }
  }

  public async getMatchDayById(id: string): Promise<PublicMatchDay> {
    let matchDay;
    try {
      matchDay = await prisma.matchDay.findUnique({ where: { id } });
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
          matchDay = await prisma.matchDay.findFirst({
            where: { stopBetTime: { gte: now } },
            orderBy: { stopBetTime: "asc" },
          });
          break;
        default:
          matchDay = await prisma.matchDay.findFirst({
            where: { stopBetTime: { lt: now } },
            orderBy: { stopBetTime: "desc" },
          });
          break;
      }
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch ${type} match day`);
    }

    return matchDay ? this.parseMatchDay(matchDay) : null;
  }

  private parseMatchDay(matchDay: {
    id: string;
    dayNumber: number;
    stopBetTime: Date;
    roundId: string;
  }): PublicMatchDay {
    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.roundId,
    };
  }
}
