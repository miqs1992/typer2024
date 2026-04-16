import Joi from "joi";
import { IRound } from "./round";

export interface IMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  roundId: string;
  round?: IRound;
}

export const matchDayJoiSchema = Joi.object({
  dayNumber: Joi.number().required().min(1),
  stopBetTime: Joi.date().required(),
  round: Joi.string().required(),
});
