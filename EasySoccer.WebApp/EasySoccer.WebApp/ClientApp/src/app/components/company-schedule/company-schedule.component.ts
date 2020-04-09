import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-company-schedule",
  templateUrl: "./company-schedule.component.html",
  styleUrls: ["./company-schedule.component.css"]
})
export class CompanyScheduleComponent implements OnInit {
  @Input()
  item: any = null;

  daysDescription: string[] = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta Feira",
    "Sexta-Feira",
    "Sabado"
  ];
  hoursOptions: any[] = [];
  constructor() {}

  ngOnInit() {
    this.hoursOptions.push({ key: 0, value: "00:00" });
    this.hoursOptions.push({ key: 1, value: "01:00" });
    this.hoursOptions.push({ key: 2, value: "02:00" });
    this.hoursOptions.push({ key: 3, value: "03:00" });
    this.hoursOptions.push({ key: 4, value: "04:00" });
    this.hoursOptions.push({ key: 5, value: "05:00" });
    this.hoursOptions.push({ key: 6, value: "06:00" });
    this.hoursOptions.push({ key: 7, value: "07:00" });
    this.hoursOptions.push({ key: 8, value: "08:00" });
    this.hoursOptions.push({ key: 9, value: "09:00" });
    this.hoursOptions.push({ key: 10, value: "10:00" });
    this.hoursOptions.push({ key: 11, value: "11:00" });
    this.hoursOptions.push({ key: 12, value: "12:00" });
    this.hoursOptions.push({ key: 13, value: "13:00" });
    this.hoursOptions.push({ key: 14, value: "14:00" });
    this.hoursOptions.push({ key: 15, value: "15:00" });
    this.hoursOptions.push({ key: 16, value: "16:00" });
    this.hoursOptions.push({ key: 17, value: "17:00" });
    this.hoursOptions.push({ key: 18, value: "18:00" });
    this.hoursOptions.push({ key: 19, value: "19:00" });
    this.hoursOptions.push({ key: 20, value: "20:00" });
    this.hoursOptions.push({ key: 21, value: "21:00" });
    this.hoursOptions.push({ key: 22, value: "22:00" });
    this.hoursOptions.push({ key: 23, value: "23:00" });
  }
}
