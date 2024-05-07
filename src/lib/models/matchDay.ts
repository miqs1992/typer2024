import mongoose from "mongoose";
import Joi from "joi";
import { IRound } from "@/lib/models/round";

export interface IMatchDay {
  id: string;
  dayNumber: number;
  stopBetTime: Date;
  round: mongoose.Types.ObjectId;
}

const matchDayDbSchema = new mongoose.Schema<IMatchDay>(
  {
    dayNumber: { type: Number, unique: true, required: true },
    stopBetTime: { type: Date, unique: true, required: true },
    round: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Round",
      required: true,
    },
  },
  { timestamps: true },
);

export const matchDayJoiSchema = Joi.object<Omit<IMatchDay, "id">>({
  dayNumber: Joi.number().required().min(1),
  stopBetTime: Joi.date().required(),
  round: Joi.string().required(),
});

export const MatchDay =
  mongoose.models?.MatchDay || mongoose.model("MatchDay", matchDayDbSchema);
