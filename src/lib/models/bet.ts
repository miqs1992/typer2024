import mongoose from "mongoose";
import { IMatch } from "./match";
import { IUser } from "./user";

export interface IResult {
  firstTeamResult: number;
  secondTeamResult: number;
  bonus?: boolean;
}

export interface IBet {
  id: string;
  match: IMatch;
  user: IUser;
  result: IResult;
  points: number;
  isExact: boolean;
}

const betSchema = new mongoose.Schema<IBet>({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  result: {
    type: {
      firstTeamResult: { type: Number, required: true },
      secondTeamResult: { type: Number, required: true },
      bonus: { type: Boolean, default: false },
    },
    required: true,
  },
  points: {
    type: Number,
    default: null,
  },
  isExact: {
    type: Boolean,
    default: null,
  },
});

export const Bet = mongoose.models?.Bet || mongoose.model("Bet", betSchema);
