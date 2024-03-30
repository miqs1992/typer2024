import mongoose from "mongoose";

const matchDaySchema = new mongoose.Schema({
  dayNumber: { type: Number, unique: true, required: true },
  stopBetTime: { type: Date, unique: true, required: true },
  round: { type: mongoose.Types.ObjectId, ref: "Round" }
}, { timestamps: true });

export const MatchDay = mongoose.models?.MatchDay || mongoose.model("MatchDay", matchDaySchema);
