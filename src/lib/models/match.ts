import mongoose from "mongoose";
import { ITeam, Team } from "./team";
import { IMatchDay, MatchDay } from "./matchDay";
import Joi from "joi";

export interface IFinalResult {
  firstTeamResult: number;
  secondTeamResult: number;
}

export interface IMatch {
  id: string;
  firstTeam: ITeam;
  secondTeam: ITeam;
  matchDay: IMatchDay;
  start: Date;
  finalResult: IFinalResult;
}

const matchSchema = new mongoose.Schema<IMatch>({
  firstTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  secondTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  matchDay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MatchDay,
    required: true,
  },
  finalResult: {
    firstTeamResult: { type: Number, default: null },
    secondTeamResult: { type: Number, default: null },
  },
});

export const matchManagementJoiSchema = Joi.object<
  Omit<IMatch, "id" | "finalResult">
>({
  firstTeam: Joi.string().required(),
  secondTeam: Joi.string().required(),
  start: Joi.date().required(),
  matchDay: Joi.string().required(),
});

export const matchResultJoiSchema = Joi.object<IFinalResult>({
  firstTeamResult: Joi.number().min(0).max(20).integer().required(),
  secondTeamResult: Joi.number().min(0).max(20).integer().required(),
});

export const Match =
  mongoose.models?.Match || mongoose.model("Match", matchSchema);
