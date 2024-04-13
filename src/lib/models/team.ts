import mongoose from "mongoose";

export interface ITeam {
  id: string;
  name: string;
  flag: string;
  winner: boolean;
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true, min: 3, max: 20 },
    flag: { type: String, required: true, unique: true, min: 2, max: 2 },
    winner: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Team = mongoose.models?.Team || mongoose.model("Team", teamSchema);
