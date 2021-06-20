import { Component, OnInit } from "@angular/core";
import { User } from "../../model/user";
import { CalendarEvent, CalendarEventAction, CalendarView } from "angular-calendar";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "../../service/dashboard.service";
import { ToastserviceService } from "../../service/toastservice.service";
import { Subject } from "rxjs";
import { isSameDay, isSameMonth } from "date-fns";
import { ReservationModalComponent } from "../modal/reservation-modal/reservation-modal.component";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
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
    "Dezembro",
  ];
  calendarEvents: Array<CalendarEvent>;
  locale: string = "pt-PT";
  monthsAlreadyGet: Array<any> = new Array<any>();
  refresh: Subject<any> = new Subject();

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private tostService: ToastserviceService
  ) {
    let datesDescription = new Array<string>();
    this.calendarEvents = new Array<CalendarEvent>();
    let currentDate = new Date();
    for (let index = 0; index > -6; index--) {
      datesDescription.push(this.monthNames[currentDate.getMonth() + index]);
    }
    this.lineChartLabels = datesDescription.reverse();
    this.getReservationCalendar();
  }

  ngOnInit() {
    this.dashboardService.getReservationChart().subscribe(
      (res) => {
        this.chartData = res;
        this.lineChartData = [
          { data: this.chartData.map((x) => x.dataCount).reverse(), label: "" },
        ];
        this.lineChartLabels = this.chartData.map((x) => x.dataLabel);
      },
      (error) => {
        this.tostService.showError("Erro ao consultar dados. " + error.Message);
      }
    );
  }
  users: Array<User>;
  pendingUsers: Array<User>;
  chartData: Array<any>;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [40, 59, 65, 69, 70], label: "" },
  ];
  public lineChartLabels: Array<any> = ["", "", "", "", "", ""];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
  };
  public lineChartColours: Array<any> = [
    {
      backgroundColor: "rgba(22,30,83,0.4)",
      borderColor: "rgba(22,30,83,1)",
      pointBackgroundColor: "rgba(255,89,31,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(22,30,83,0.8)",
    },
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
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  getReservationCalendar() {
    this.monthsAlreadyGet.push({
      month: this.viewDate.getMonth() + 1,
      year: this.viewDate.getFullYear(),
    });
    this.dashboardService
      .getReservationCalendar(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth() + 1,
        0
      )
      .subscribe(
        (res) => {
          res.forEach((element) => {
            this.calendarEvents.push({
              start: new Date(element.startDate),
              end: new Date(element.endDate),
              title: element.title,
              color: {
                primary: element.color,
                secondary: "#FAE3E3",
              },
              allDay: false,
              draggable: false,
              id : element.id
            });
            this.refresh.next();
          });
        },
        (error) => {
          this.tostService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  openModalReservation(event){
    let modalOption : NgbModalOptions = {};
    modalOption.backdrop = "static";
          modalOption.keyboard = false;
          modalOption.ariaLabelledBy = "modal-basic-title";
          const modalRef = this.modalService.open(
            ReservationModalComponent,
            modalOption
          );
          modalRef.result.then(
            (result) => {
            },
            (reason) => {}
          );
          modalRef.componentInstance.reservationId = event.id;
  }

  checkIfHaveToGet() {
    let currentMonth = this.viewDate.getMonth() + 1;
    let currentYear = this.viewDate.getFullYear();
    if (
      this.monthsAlreadyGet.some(
        (n) => n.month == currentMonth && n.year == currentYear
      ) == false
    ) {
      this.getReservationCalendar();
    }
  }

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(events);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
