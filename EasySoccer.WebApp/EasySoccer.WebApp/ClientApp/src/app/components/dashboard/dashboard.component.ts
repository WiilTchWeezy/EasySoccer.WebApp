import { Component, OnInit } from "@angular/core";
import { User } from "../../model/user";
import { CalendarEvent, CalendarView } from "angular-calendar";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "../../service/dashboard.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  closeResult: string;
  monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  calendarEvents: Array<CalendarEvent>;

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService
  ) {
    let datesDescription = new Array<string>();
    this.calendarEvents = new Array<CalendarEvent>();
    let currentDate = new Date();
    for (let index = 0; index > -6; index--) {
      datesDescription.push(this.monthNames[currentDate.getMonth() + index]);
    }
    this.lineChartLabels = datesDescription.reverse();
    this.dashboardService
      .getReservationCalendar(new Date().getMonth() + 1, 0)
      .subscribe(
        res => {
          res.forEach(element => {
            this.calendarEvents.push({
              start: new Date(element.startDate),
              end: new Date(element.endDate),
              title: element.title,
              color: {
                primary: "#ad2121",
                secondary: "#FAE3E3"
              },
              allDay: false,
              draggable: false
            });
          });
          console.log(this.calendarEvents);
        },
        error => {}
      );
  }

  ngOnInit() {
    this.dashboardService.getReservationChart().subscribe(
      res => {
        this.chartData = res;
        this.lineChartData = [
          { data: this.chartData.map(x => x.dataCount).reverse(), label: "" }
        ];
        this.lineChartLabels = this.chartData.map(x => x.dataLabel);
      },
      error => {}
    );
  }
  users: Array<User>;
  pendingUsers: Array<User>;
  chartData: Array<any>;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [40, 59, 65, 69, 70], label: "" }
  ];
  public lineChartLabels: Array<any> = ["", "", "", "", "", ""];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    {
      backgroundColor: "rgba(22,30,83,0.4)",
      borderColor: "rgba(22,30,83,1)",
      pointBackgroundColor: "rgba(255,89,31,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(22,30,83,0.8)"
    }
  ];
  public lineChartLegend = false;
  public lineChartType = "line";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  open(content: any) {
    console.log("called open");
    console.log(this.modalService);
    console.log(content);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
