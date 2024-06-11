import mongoose from "mongoose";
import { Player } from "@/lib/models/player";
import { Team } from "@/lib/models/team";
import Joi from "joi";
import { IRound } from "@/lib/models/round";

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
  winner: mongoose.Types.ObjectId | null;
  topScorer: mongoose.Types.ObjectId | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true, min: 3, max: 50 },
    encryptedPassword: { type: String, required: true, min: 5, max: 50 },
    isAdmin: { type: Boolean, default: false },
    hasPaid: { type: Boolean, default: false },

    points: { type: Number, default: 0 },
    leagueRank: { type: Number, default: 0 },
    exactBetCount: { type: Number, default: 0 },

    winner: { type: mongoose.Schema.Types.ObjectId, ref: Team },
    topScorer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Player,
    },
  },
  { timestamps: true },
);

export const userJoiSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email(),
  password: Joi.string().optional().min(8),
  passwordConfirmation: Joi.ref("password"),
  hasPaid: Joi.boolean(),
}).with("password", "passwordConfirmation");

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
