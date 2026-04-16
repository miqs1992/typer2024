import { RoundStage } from "@/lib/models/round";
import { NonAdminService } from "@/modules/non-admin-service";
import { ServiceError } from "@/modules/service.error";
import { prisma } from "@/lib/prisma";

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
      const rounds = await prisma.round.findMany({ orderBy: { order: "asc" } });
      return rounds.map((round) => this.parseRound(round));
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to fetch all rounds");
    }
  }

  public async getRoundById(id: string): Promise<PublicRound> {
    try {
      const round = await prisma.round.findUnique({ where: { id } });
      if (!round) throw new ServiceError(`Round with id: ${id} not found`);
      return this.parseRound(round);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to fetch round with id: ${id}`);
    }
  }

  private parseRound(round: {
    id: string;
    name: string;
    order: number;
    scoreFactor: number;
    stage: string;
  }): PublicRound {
    return {
      id: round.id,
      name: round.name,
      order: round.order,
      scoreFactor: round.scoreFactor,
      stage: round.stage as RoundStage,
    };
  }
}
