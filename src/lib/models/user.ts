import Joi from "joi";
import { ITeam } from "./team";
import { IPlayer } from "./player";

export interface IUser {
  id: string;
  email: string;
  encryptedPassword: string;
  username: string;
  isAdmin: boolean;
  hasPaid: boolean;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  winnerId: string | null;
  winner?: ITeam | null;
  topScorerId: string | null;
  topScorer?: IPlayer | null;
}

export const userJoiAdminSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email(),
  password: Joi.string().optional().min(8),
  passwordConfirmation: Joi.ref("password"),
  hasPaid: Joi.boolean(),
}).with("password", "passwordConfirmation");

export const userJoiSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().optional().min(8),
  passwordConfirmation: Joi.ref("password"),
}).with("password", "passwordConfirmation");
