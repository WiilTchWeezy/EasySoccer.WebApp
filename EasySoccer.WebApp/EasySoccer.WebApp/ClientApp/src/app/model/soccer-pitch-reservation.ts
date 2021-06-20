import { Time } from "@angular/common";

export class SoccerPitchReservation {
  id: string;
  selectedDateStruct: any;
  selectedDate: Date;
  selectedHourStart: any = {};
  selectedHourEnd: any = {};
  hourStart: string;
  hourEnd: string;
  soccerPitchName: string;
  userName: string;
  userPhone: string;
  personCompanyId: string;
  soccerPitchId: string;
  soccerPitchSoccerPitchPlanId: number;
  selectedUser: any = {};
  userSelectDate: any;
  soccerPitchPlanId: number;
  status: number;
  statusDescription: string;
  currentTimeOffset: number;
  application: number;
  applicationDescription: string;
  personName: string;
}
