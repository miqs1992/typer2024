import mongoose from "mongoose";
import { ITeam } from "./team";
import { IMatchDay } from "./matchDay";

export interface IResult {
  firstTeamResult: number;
  secondTeamResult: number;
  bonus?: boolean;
}

export interface IBet {
  id: string;
  user: mongoose.Types.ObjectId;
  result: IResult;
}

export interface IMatch {
  id: string;
  firstTeam: ITeam;
  secondTeam: ITeam;
  matchDay: IMatchDay;
  start: Date;
  bets: IBet[];
  finalResult: Partial<IResult>;
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
  matchDay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MatchDay",
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  bets: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        result: {
          firstTeamResult: { type: Number, required: true },
          secondTeamResult: { type: Number, required: true },
          bonus: { type: Boolean, default: false },
        },
      },
    ],
    default: [],
  },
  finalResult: {
    firstTeamResult: { type: Number, default: null },
    secondTeamResult: { type: Number, default: null },
  },
});

export const Match =
  mongoose.models?.Match || mongoose.model("Match", matchSchema);
