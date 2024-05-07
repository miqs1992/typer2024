import { AdminService } from "@/modules/admin/admin-service";
import { MatchDay, matchDayJoiSchema } from "@/lib/models/matchDay";
import { ServiceError } from "@/modules/service.error";

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

    const newMatchDay = new MatchDay(value);

    try {
      await newMatchDay.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new match day");
    }

    return this.parseMatchDay(newMatchDay);
  }

  public async updateMatchDay(
    matchDayId: string,
    formData: FormData,
  ): Promise<PersistedMatchDay> {
    const { dayNumber, stopBetTime } = Object.fromEntries(formData);

    const existingMatchDay = await MatchDay.findById(matchDayId);

    if (!existingMatchDay) {
      throw new ServiceError("Match day not found");
    }

    const { value, error } = matchDayJoiSchema.validate({
      dayNumber,
      stopBetTime,
      round: existingMatchDay.round,
    });

    const matchDay = await MatchDay.findByIdAndUpdate(matchDayId, value);

    try {
      await matchDay.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update match day ${matchDayId}`);
    }

    return this.parseMatchDay(matchDay);
  }

  public async getMatchDay(matchDayId: string): Promise<PersistedMatchDay> {
    let matchDay;

    try {
      matchDay = await MatchDay.findById(matchDayId);
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
      await MatchDay.findByIdAndDelete(matchDayId);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove match day ${matchDayId}`);
    }
  }

  public async getMatchDaysInRound(
    roundId: string,
  ): Promise<PersistedMatchDay[]> {
    let matchDays;

    try {
      matchDays = await MatchDay.find({ round: roundId }).sort({
        dayNumber: 1,
      });
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch match days for round");
    }

    return matchDays.map((day) => this.parseMatchDay(day));
  }

  private parseMatchDay(matchDay: any): PersistedMatchDay {
    return {
      id: matchDay.id,
      dayNumber: matchDay.dayNumber,
      stopBetTime: matchDay.stopBetTime,
      roundId: matchDay.round.toString(),
    };
  }
}
