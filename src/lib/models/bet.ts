import { IMatch } from "./match";
import { IUser } from "./user";
import { IMatchDay } from "./matchDay";
import Joi from "joi";

export interface IResult {
  firstTeamResult: number;
  secondTeamResult: number;
  bonus?: boolean;
}

export interface IBet {
  id: string;
  matchId: string;
  match?: IMatch;
  matchDayId: string;
  matchDay?: IMatchDay;
  userId: string;
  user?: IUser;
  firstTeamResult: number;
  secondTeamResult: number;
  bonus: boolean;
  points: number | null;
  isExact: boolean | null;
}

export const betResultJoiSchema = Joi.object<IResult>({
  firstTeamResult: Joi.number().min(0).max(20).integer().required(),
  secondTeamResult: Joi.number().min(0).max(20).integer().required(),
  bonus: Joi.boolean(),
});
