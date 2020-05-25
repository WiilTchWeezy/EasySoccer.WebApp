import { Soccerpitchsoccerpitchplan } from "../model/soccerpitchsoccerpitchplan";
import { Soccerpitchplan } from "./soccerpitchplan";
export class Soccerpitch {
  id: Number;
  active: Boolean;
  description: string;
  hasRoof: Boolean;
  name: string;
  numberOfPlayers: Number;
  soccerPitchSoccerPitchPlans: Soccerpitchsoccerpitchplan[];
  sportType: any;
  sportTypeId: any;
  plans: Soccerpitchplan[];
  interval: any;
  imageName: string;
}
