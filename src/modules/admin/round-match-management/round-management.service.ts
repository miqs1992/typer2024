import { Round, roundJoiSchema, RoundStage } from "@/lib/models/round";
import { ServiceError } from "@/modules/service.error";
import { AdminService } from "@/modules/admin/admin-service";

interface PersistedRound {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
}

export class RoundManagementService extends AdminService {
  public async createNewRound(formData: FormData): Promise<PersistedRound> {
    const { name, stage, scoreFactor, order } = Object.fromEntries(formData);

    const { value, error } = roundJoiSchema.validate({
      name,
      stage,
      scoreFactor,
      order,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    const newRound = new Round(value);

    try {
      await newRound.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new round");
    }

    return {
      id: newRound.id,
      name: newRound.name,
      order: newRound.order,
      scoreFactor: newRound.scoreFactor,
      stage: newRound.stage,
    };
  }

  public async updateRound(
    id: string,
    formData: FormData,
  ): Promise<PersistedRound> {
    const { name, stage, scoreFactor, order } = Object.fromEntries(formData);

    const { value, error } = roundJoiSchema.validate({
      name,
      stage,
      scoreFactor,
      order,
    });

    if (error) {
      throw new ServiceError(error.message);
    }

    const round = await Round.findByIdAndUpdate(id, value);

    try {
      await round.save();
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update round ${id}`);
    }

    return this.parseRound(round);
  }

  public async removeRound(id: string): Promise<void> {
    try {
      await Round.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove round ${id}`);
    }
  }

  public async getRound(id: string): Promise<PersistedRound> {
    let round;
    try {
      round = await Round.findById(id);
    } catch (error) {
      throw new ServiceError(`Failed fetch round ${id}`);
    }

    if (!round) {
      throw new ServiceError(`Round ${id} not found`);
    }

    return this.parseRound(round);
  }

  public async getRounds(): Promise<PersistedRound[]> {
    let rounds;

    try {
      rounds = await Round.find().sort({ order: 1 });
    } catch (error) {
      console.log(error);
      throw new Error("failed to fetch rounds");
    }

    return rounds.map((round) => this.parseRound(round));
  }

  private parseRound(round: any): PersistedRound {
    return {
      id: round.id,
      name: round.name,
      order: round.order,
      scoreFactor: round.scoreFactor,
      stage: round.stage,
    };
  }
}
