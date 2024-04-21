import mongoose from "mongoose";
import { Player } from "@/lib/models/player";
import { Team } from "@/lib/models/team";

export interface IUser {
  id: string;
  email: string;
  encryptedPassword: string;
  username: string;
  isAdmin: boolean;
  points: number;
  leagueRank: number;
  exactBetCount: number;
  winner: mongoose.Types.ObjectId | null;
  topScorer: mongoose.Types.ObjectId | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, min: 3, max: 50 },
    encryptedPassword: { type: String, required: true, min: 5, max: 50 },
    isAdmin: { type: Boolean, default: false },

    points: { type: Number, default: 0 },
    leagueRank: { type: Number, default: 0 },
    exactBetCount: { type: Number, default: 0 },

    winner: { type: mongoose.Schema.Types.ObjectId, ref: Team },
    topScorer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
