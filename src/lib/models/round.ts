import mongoose from "mongoose";

export interface IRound {
  id: string;
  name: string;
  order: number;
  scoreFactor: number;
  stage: number;
}

const roundSchema = new mongoose.Schema<IRound>({
  name: { type: String, required: true, unique: true, min: 3, max: 20 },
  order: { type: Number, required: true, unique: true },
  scoreFactor: { type: Number, default: 1 },
  stage: { type: Number, default: 1 },
}, { timestamps: true, toJSON: { virtuals: true } });

roundSchema.virtual('matchDays', {
  ref: 'MatchDay',
  localField: '_id',
  foreignField: 'round'
})

export const Round = mongoose.models?.Round || mongoose.model("Round", roundSchema);
