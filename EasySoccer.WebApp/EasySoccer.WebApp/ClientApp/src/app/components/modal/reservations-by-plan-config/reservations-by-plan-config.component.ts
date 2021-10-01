import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ScheduleService } from "../../../service/schedule.service";
import { ToastserviceService } from "../../../service/toastservice.service";

@Component({
  selector: "app-reservations-by-plan-config",
  templateUrl: "./reservations-by-plan-config.component.html",
  styleUrls: ["./reservations-by-plan-config.component.css"],
})
export class ReservationsByPlanConfigComponent implements OnInit {
  childReservation: any = {};
  reservationId: any;
  constructor(
    public activeModal: NgbActiveModal,
    public scheduleService: ScheduleService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.getReservationGenerated();
  }

  getReservationGenerated() {
    this.scheduleService.getChildrenReservation(this.reservationId).subscribe(
      (res) => {
        this.childReservation = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao carregar informações. " + error.error.message
        );
      }
    );
  }
}
