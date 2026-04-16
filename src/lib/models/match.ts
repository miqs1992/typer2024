import { ITeam } from "./team";
import { IMatchDay } from "./matchDay";
import Joi from "joi";

export interface IFinalResult {
  firstTeamResult: number;
  secondTeamResult: number;
}

export interface IMatch {
  id: string;
  firstTeamId: string;
  firstTeam?: ITeam;
  secondTeamId: string;
  secondTeam?: ITeam;
  matchDayId: string;
  matchDay?: IMatchDay;
  start: Date;
  firstTeamResult: number | null;
  secondTeamResult: number | null;
}

export const matchManagementJoiSchema = Joi.object({
  firstTeam: Joi.string().required(),
  secondTeam: Joi.string().required(),
  start: Joi.date().required(),
  matchDay: Joi.string().required(),
});

export const matchResultJoiSchema = Joi.object<IFinalResult>({
  firstTeamResult: Joi.number().min(0).max(20).integer().required(),
  secondTeamResult: Joi.number().min(0).max(20).integer().required(),
});
