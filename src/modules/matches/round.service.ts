import { Round, RoundStage } from "@/lib/models/round";
import { NonAdminService } from "@/modules/non-admin-service";
import { ServiceError } from "@/modules/service.error";

export interface PublicRound {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
}

export class RoundService extends NonAdminService {
  public async getAllRounds(): Promise<PublicRound[]> {
    try {
      const rounds = await Round.find().sort({ order: 1 });
      return rounds.map((round: any) => this.parseRound(round));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch all rounds");
    }
  }

  public async getRoundById(id: string): Promise<PublicRound> {
    try {
      const round = await Round.findById(id);
      return this.parseRound(round);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch round with id: ${id}`);
    }
  }

  private parseRound(round: any): PublicRound {
    return {
      id: round.id,
      name: round.name,
      order: round.order,
      scoreFactor: round.scoreFactor,
      stage: round.stage,
    };
  }
}
