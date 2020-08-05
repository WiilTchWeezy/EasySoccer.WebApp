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
  collectionSize = 0;
  selectedSoccerPitch: Soccerpitch;
  modalTitle: String;
  userRespId: String;
  modalSoccerPitchReservation: SoccerPitchReservation;
  selectedDate: any;
  modalOption: NgbModalOptions = {};
  filter: any = {};
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
        this.filter.userName
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
        this.toastService.showError("Erro ao consultar dados. " + error.error);
      }
    );
  }

  transformData() {
    this.modalSoccerPitchReservation.hourStart =
      this.modalSoccerPitchReservation.selectedHourStart.hour +
      ":" +
      this.modalSoccerPitchReservation.selectedHourStart.minute;
    this.modalSoccerPitchReservation.hourEnd =
      this.modalSoccerPitchReservation.selectedHourEnd.hour +
      ":" +
      this.modalSoccerPitchReservation.selectedHourEnd.minute;

    this.modalSoccerPitchReservation.selectedDate = new Date(
      this.modalSoccerPitchReservation.userSelectDate.year,
      this.modalSoccerPitchReservation.userSelectDate.month - 1,
      this.modalSoccerPitchReservation.userSelectDate.day
    );
  }
  fitDataToFront() {
    this.modalSoccerPitchReservation.userSelectDate = {
      year: new Date(
        this.modalSoccerPitchReservation.selectedDate
      ).getFullYear(),
      month:
        new Date(this.modalSoccerPitchReservation.selectedDate).getMonth() + 1,
      day: new Date(this.modalSoccerPitchReservation.selectedDate).getDate(),
    };

    this.modalSoccerPitchReservation.selectedUser = {
      name:
        this.modalSoccerPitchReservation.userName +
        "(" +
        this.modalSoccerPitchReservation.userPhone +
        ")",
      id: this.modalSoccerPitchReservation.userId,
    };
  }

  openModal(content: any, selectedSoccerPitch: SoccerPitchReservation) {
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
      this.fitDataToFront();
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
        this.transformData();
        this.sendRequest(isEditting);
      },
      (reason) => {}
    );
    modalRef.componentInstance.modalSoccerPitchReservation = this.modalSoccerPitchReservation;
  }

  sendRequest(edit) {
    console.log(this.modalSoccerPitchReservation);
    if (edit) {
      this.scheduleService
        .patchSoccerPitchReservation(this.modalSoccerPitchReservation)
        .subscribe(
          (data) => {
            this.toastService.showSuccess(
              "Agendamento atualizado com sucesso."
            );
            this.getReservations();
            this.modalSoccerPitchReservation = new SoccerPitchReservation();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao atualizar dados. " + error.error
            );
          }
        );
    } else {
      this.scheduleService
        .postSoccerPitchReservation(this.modalSoccerPitchReservation)
        .subscribe(
          (data) => {
            this.toastService.showSuccess("Agendamento inserido com sucesso.");
            this.getReservations();
            this.modalSoccerPitchReservation = new SoccerPitchReservation();
          },
          (error) => {
            console.log(error);
            this.toastService.showError(
              "Erro ao inserir dados. " + error.error
            );
          }
        );
    }
  }
}
