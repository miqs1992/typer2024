import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 3, max: 20 },
  email: { type: String, required: true, unique: true, min: 3, max: 50 },
  encryptedPassword: { type: String, required: true, min: 5, max: 50 },
  isAdmin: { type: Boolean, default: false },

  points: { type: Number, default: 0 },
  leagueRank: { type: Number, default: 0 },
  exactBetCount: { type: Number, default: 0 },
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
