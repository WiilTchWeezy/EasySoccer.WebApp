import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ScheduleService } from "../../service/schedule.service";
import { SoccerpitchService } from "../../service/soccerpitch.service";
import { UserService } from "../../service/user.service";
import { SoccerPitchReservation } from "../../model/soccer-pitch-reservation";
import {
  NgbModal,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { Soccerpitch } from "../../model/soccerpitch";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { AddUserModalComponent } from "../modal/add-user-modal/add-user-modal.component";
import { ToastserviceService } from "../../service/toastservice.service";
import { CustomDateParserFormatter } from "../../service/adapter/CustomDateParseAdapter";
import { ReservationModalComponent } from "../modal/reservation-modal/reservation-modal.component";

@Component({
  selector: "app-myschedule",
  templateUrl: "./myschedule.component.html",
  styleUrls: ["./myschedule.component.css"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class MyscheduleComponent implements OnInit {
  page = 1;
  pageSize = 10;
  soccerPitchReservations: SoccerPitchReservation[];
  soccerPitchs: Soccerpitch[];
  soccerPitchsPlans: Soccerpitchplan[];
  status: any[];
  collectionSize = 0;
  selectedSoccerPitch: Soccerpitch;
  modalTitle: String;
  userRespId: String;
  modalSoccerPitchReservation: SoccerPitchReservation;
  selectedDate: any;
  modalOption: NgbModalOptions = {};
  filter: any = {
    soccerPitchId: 0,
    soccerPitchPlanId: 0,
    status: 0,
  };
  loading = false;
  constructor(
    public scheduleService: ScheduleService,
    private modalService: NgbModal,
    public soccerpitchService: SoccerpitchService,
    public soccerpitchplanService: SoccerpitchplanService,
    public userService: UserService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.getReservations();
    this.getSoccerPitchs();
    this.getSoccerPitchsPlans();
    this.getStatus();
  }

  getReservations() {
    this.loading = true;
    this.scheduleService
      .getSchedules(
        this.page,
        this.pageSize,
        this.filter.initialDate,
        this.filter.finalDate,
        this.filter.soccerPitchId,
        this.filter.soccerPitchPlanId,
        this.filter.userName,
        this.filter.status
      )
      .subscribe(
        (res) => {
          this.soccerPitchReservations = res.data;
          this.collectionSize = res.total;
          this.loading = false;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
          this.loading = false;
        }
      );
  }

  getSoccerPitchs() {
    this.soccerpitchService.getSoccerPitchs().subscribe(
      (res) => {
        this.soccerPitchs = res;
      },
      (error) => {
        this.toastService.showError("Erro ao consultar dados. " + error.error);
      }
    );
  }

  getSoccerPitchsPlans() {
    this.soccerpitchplanService.getSoccerPitchPlan().subscribe(
      (res) => {
        this.soccerPitchsPlans = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.message
        );
      }
    );
  }

  openModal(selectedSoccerPitch: SoccerPitchReservation) {
    let isEditting = false;
    let isSaved = false;
    if (
      selectedSoccerPitch != null &&
      selectedSoccerPitch != undefined &&
      selectedSoccerPitch.id != "" &&
      selectedSoccerPitch.id != undefined
    ) {
      this.modalTitle = "Editar quadra";
      this.modalSoccerPitchReservation = selectedSoccerPitch;
      isEditting = true;
    } else {
      this.modalSoccerPitchReservation = new SoccerPitchReservation();
      this.modalSoccerPitchReservation.selectedHourStart = {
        hour: null,
        minute: null,
      };
      this.modalSoccerPitchReservation.selectedHourEnd = {
        hour: null,
        minute: null,
      };
      this.modalTitle = "Adicionar nova quadra";
    }
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.ariaLabelledBy = "modal-basic-title";
    const modalRef = this.modalService.open(
      ReservationModalComponent,
      this.modalOption
    );
    modalRef.result.then(
      (result) => {
        isSaved = true;
        this.getReservations();
      },
      (reason) => {}
    );
    modalRef.componentInstance.modalSoccerPitchReservation = this.modalSoccerPitchReservation;
    modalRef.componentInstance.reservationId = this.modalSoccerPitchReservation.id;
    modalRef.componentInstance.isEditting = isEditting;
  }

  getStatus() {
    this.scheduleService.getReservationStatus().subscribe(
      (res) => {
        this.status = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.message
        );
      }
    );
  }
}
