import { roundJoiSchema, RoundStage } from "@/lib/models/round";
import { ServiceError } from "@/modules/service.error";
import { AdminService } from "@/modules/admin/admin-service";
import { prisma } from "@/lib/prisma";
import { RoundStage as PrismaRoundStage } from "@/generated/prisma/enums";

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

    try {
      const round = await prisma.round.create({
        data: { ...value, stage: value.stage as PrismaRoundStage },
      });
      return this.parseRound(round);
    } catch (error) {
      console.log(error);
      throw new ServiceError("Failed to create new round");
    }
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

    try {
      const round = await prisma.round.update({
        where: { id },
        data: { ...value, stage: value.stage as PrismaRoundStage },
      });
      return this.parseRound(round);
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to update round ${id}`);
    }
  }

  public async removeRound(id: string): Promise<void> {
    try {
      await prisma.round.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new ServiceError(`Failed to remove round ${id}`);
    }
  }

  public async getRound(id: string): Promise<PersistedRound> {
    let round;
    try {
      round = await prisma.round.findUnique({ where: { id } });
    } catch (error) {
      throw new ServiceError(`Failed fetch round ${id}`);
    }

    if (!round) {
      throw new ServiceError(`Round ${id} not found`);
    }

    return this.parseRound(round);
  }

  public async getRounds(): Promise<PersistedRound[]> {
    try {
      const rounds = await prisma.round.findMany({
        orderBy: { order: "asc" },
      });
      return rounds.map((round) => this.parseRound(round));
    } catch (error) {
      console.log(error);
      throw new Error("failed to fetch rounds");
    }
  }

  private parseRound(round: {
    id: string;
    name: string;
    order: number;
    scoreFactor: number;
    stage: string;
  }): PersistedRound {
    return {
      id: round.id,
      name: round.name,
      order: round.order,
      scoreFactor: round.scoreFactor,
      stage: round.stage as RoundStage,
    };
  }
}
