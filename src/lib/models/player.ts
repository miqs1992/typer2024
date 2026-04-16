import { ITeam } from "./team";

export interface IPlayer {
  id: string;
  name: string;
  goals: number;
  assists: number;
  king: boolean;
  teamId: string;
  team?: ITeam;
}
