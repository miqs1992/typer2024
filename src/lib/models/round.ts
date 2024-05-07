import mongoose from "mongoose";
import Joi from "joi";

const roundStages = ["group", "knockout"];
export type RoundStage = (typeof roundStages)[number];

export interface IRound {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: RoundStage;
}

const roundDbSchema = new mongoose.Schema<IRound>(
  {
    name: { type: String, required: true, unique: true, min: 3, max: 20 },
    order: { type: Number, required: true, unique: true },
    scoreFactor: { type: Number, default: 1 },
    stage: { type: String, enum: roundStages, default: "group" },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const roundJoiSchema = Joi.object<Omit<IRound, "id">>({
  name: Joi.string().required().min(3).max(20),
  order: Joi.number().required().min(1),
  scoreFactor: Joi.number().precision(2).min(1).max(3),
  stage: Joi.string().valid(...roundStages),
});

roundDbSchema.virtual("matchDays", {
  ref: "MatchDay",
  localField: "_id",
  foreignField: "round",
});

export const Round =
  mongoose.models?.Round || mongoose.model("Round", roundDbSchema);
