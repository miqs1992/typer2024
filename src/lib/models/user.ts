import mongoose from "mongoose";

export interface IUser {
  id: string;
  email: string;
  encryptedPassword: string;
  username: string;
  isAdmin: boolean;
  points: number;
  leagueRank: number;
  exactBetCount: number;
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
  },
  { timestamps: true },
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
