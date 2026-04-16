import Joi from "joi";

const roundStages = ["group", "knockout"];
export type RoundStage = (typeof roundStages)[number];

export interface IRound {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
}

export const roundJoiSchema = Joi.object<Omit<IRound, "id">>({
  name: Joi.string().required().min(3).max(20),
  order: Joi.number().required().min(1),
  scoreFactor: Joi.number().precision(2).min(1).max(3),
  stage: Joi.string().valid(...roundStages),
});
