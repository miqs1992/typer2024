import mongoose from "mongoose";
import { Team } from "./team";

export interface IPlayer {
  id: string;
  name: string;
  goals: number;
  assists: number;
  king: boolean;
  team: {
    name: string;
    flag: string;
  };
}

const playerSchema = new mongoose.Schema<IPlayer>(
  {
    name: { type: String, required: true, unique: true, min: 3, max: 20 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true },
    king: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Player =
  mongoose.models?.Player || mongoose.model("Player", playerSchema);
