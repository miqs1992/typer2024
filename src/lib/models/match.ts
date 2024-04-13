import mongoose from "mongoose";
import { ITeam } from "./team";
import { IMatchDay } from "./matchDay";

export interface IFinalResult {
  firstTeamResult: number;
  secondTeamResult: number;
}

export interface IMatch {
  _id: string;
  firstTeam: ITeam;
  secondTeam: ITeam;
  matchDay: IMatchDay;
  start: Date;
  finalResult: IFinalResult;
}

const matchSchema = new mongoose.Schema<IMatch>({
  firstTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  secondTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  matchDay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MatchDay",
    required: true,
  },
  finalResult: {
    firstTeamResult: { type: Number, default: null },
    secondTeamResult: { type: Number, default: null },
  },
});

matchSchema.virtual("");

export const Match =
  mongoose.models?.Match || mongoose.model("Match", matchSchema);
