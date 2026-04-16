import { AdminService } from "@/modules/admin/admin-service";
import { matchDayJoiSchema } from "@/lib/models/matchDay";
import { ServiceError } from "@/modules/service.error";
import { prisma } from "@/lib/prisma";

export interface PersistedMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  roundId: string;
}

export class MatchDayManagementService extends AdminService {
  public async createNewMatchDay(
    formData: FormData,
  ): Promise<PersistedMatchDay> {
    const { roundId, dayNumber, stopBetTime } = Object.fromEntries(formData);

    const { value, error } = matchDayJoiSchema.validate({
      round: roundId,
      dayNumber,
      stopBetTime,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      const matchDay = await prisma.matchDay.create({
        data: {
          roundId: value.round,
          dayNumber: Number(value.dayNumber),
          stopBetTime: new Date(value.stopBetTime),
        },
      });
      return this.parseMatchDay(matchDay);
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new match day");
    }
  }

  public async updateMatchDay(
    matchDayId: string,
    formData: FormData,
  ): Promise<PersistedMatchDay> {
    const { dayNumber, stopBetTime } = Object.fromEntries(formData);

    const existingMatchDay = await prisma.matchDay.findUnique({
      where: { id: matchDayId },
    });

    if (!existingMatchDay) {
      throw new ServiceError("Match day not found");
    }

    const { value, error } = matchDayJoiSchema.validate({
      dayNumber,
      stopBetTime,
      round: existingMatchDay.roundId,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    try {
      const matchDay = await prisma.matchDay.update({
        where: { id: matchDayId },
        data: {
          dayNumber: Number(value.dayNumber),
          stopBetTime: new Date(value.stopBetTime),
        },
      });
      return this.parseMatchDay(matchDay);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match day ${matchDayId}`);
    }
  }

  public async getMatchDay(matchDayId: string): Promise<PersistedMatchDay> {
    let matchDay;

    try {
      matchDay = await prisma.matchDay.findUnique({
        where: { id: matchDayId },
      });
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch match day");
    }

    if (!matchDay) {
      throw new ServiceError("Match day not found");
    }

    return this.parseMatchDay(matchDay);
  }

  public async removeMatchDay(matchDayId: string): Promise<void> {
    try {
      await prisma.matchDay.delete({ where: { id: matchDayId } });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove match day ${matchDayId}`);
    }
  }

  public async getMatchDaysInRound(
    roundId: string,
  ): Promise<PersistedMatchDay[]> {
    try {
      const matchDays = await prisma.matchDay.findMany({
        where: { roundId },
        orderBy: { dayNumber: "asc" },
      });
      return matchDays.map((day) => this.parseMatchDay(day));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch match days for round");
    }
  }

  private parseMatchDay(matchDay: {
    id: string;
    dayNumber: number;
    stopBetTime: Date;
    roundId: string;
  }): PersistedMatchDay {
    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.roundId,
    };
  }
}
