import mongoose from "mongoose";

export interface IMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  round: mongoose.Types.ObjectId;
}

const matchDaySchema = new mongoose.Schema<IMatchDay>({
  dayNumber: { type: Number, unique: true, required: true },
  stopBetTime: { type: Date, unique: true, required: true },
  round: { type: mongoose.Schema.Types.ObjectId, ref: "Round", required: true }
}, { timestamps: true });

export const MatchDay = mongoose.models?.MatchDay || mongoose.model("MatchDay", matchDaySchema);
