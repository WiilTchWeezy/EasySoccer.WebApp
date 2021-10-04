import { Component, OnInit } from "@angular/core";
import { SoccerPitchReservation } from "../../../model/soccer-pitch-reservation";
import {
  NgbModal,
  NgbActiveModal,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { AddUserModalComponent } from "../add-user-modal/add-user-modal.component";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { SoccerpitchService } from "../../../service/soccerpitch.service";
import { SoccerpitchplanService } from "../../../service/soccerpitchplan.service";
import { ToastserviceService } from "../../../service/toastservice.service";
import { Soccerpitch } from "../../../model/soccerpitch";
import { Soccerpitchplan } from "../../../model/soccerpitchplan";
import { CustomDateParserFormatter } from "../../../service/adapter/CustomDateParseAdapter";
import { ScheduleService } from "../../../service/schedule.service";
import { PersonCompanyService } from "../../../service/person-company.service";
import { ReservationListModalComponent } from "../reservation-list-modal/reservation-list-modal.component";
import { ReservationsByPlanConfigComponent } from "../reservations-by-plan-config/reservations-by-plan-config.component";
import { ReservationPaymentsModalComponent } from "../reservation-payments-modal/reservation-payments-modal.component";

@Component({
  selector: "app-reservation-modal",
  templateUrl: "./reservation-modal.component.html",
  styleUrls: ["./reservation-modal.component.css"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ReservationModalComponent implements OnInit {
  modalSoccerPitchReservation: SoccerPitchReservation;
  searchFailed = false;
  searching = false;
  isEditting = false;
  soccerPitchs: Soccerpitch[];
  soccerPitchsPlans: Soccerpitchplan[];
  reservationId;
  reservationInfo;
  constructor(
    private modalService: NgbModal,
    public personCompanyService: PersonCompanyService,
    public activeModal: NgbActiveModal,
    public soccerpitchService: SoccerpitchService,
    public soccerpitchplanService: SoccerpitchplanService,
    private toastService: ToastserviceService,
    public scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.modalSoccerPitchReservation = new SoccerPitchReservation();
    if (
      this.modalSoccerPitchReservation &&
      this.modalSoccerPitchReservation.soccerPitchId
    ) {
      this.getPlansBySoccerPitchId(
        this.modalSoccerPitchReservation.soccerPitchId
      );
    }
    this.getSoccerPitchs();
    if (this.isEditting) {
    }
    if (this.reservationId) {
      this.isEditting = true;
      this.getReservationInfo();
    }
  }

  fitDataToFront() {
    this.modalSoccerPitchReservation.selectedDate =
      this.reservationInfo.selectedDateStart;
    this.modalSoccerPitchReservation.userName =
      this.reservationInfo.personCompanyName;
    this.modalSoccerPitchReservation.userPhone =
      this.reservationInfo.personCompanyPhone;
    this.modalSoccerPitchReservation.userSelectDate = {
      year: new Date(
        this.modalSoccerPitchReservation.selectedDate
      ).getFullYear(),
      month:
        new Date(this.modalSoccerPitchReservation.selectedDate).getMonth() + 1,
      day: new Date(this.modalSoccerPitchReservation.selectedDate).getDate(),
    };

    this.modalSoccerPitchReservation.selectedUser = {
      name: this.modalSoccerPitchReservation.userName,
      id: this.reservationInfo.personCompanyId,
    };
    if (this.modalSoccerPitchReservation.userPhone) {
      this.modalSoccerPitchReservation.selectedUser.name +=
        "(" + this.modalSoccerPitchReservation.userPhone + ")";
    }
  }

  openUserModal() {
    this.modalService.open(AddUserModalComponent).result.then(
      (result) => {
        this.modalSoccerPitchReservation.personCompanyId = result.id;
        this.modalSoccerPitchReservation.selectedUser = {
          name: result.name + " (" + result.phone + ")",
          personCompanyId: result.id,
        };
      },
      (reason) => {}
    );
  }

  selectUser($event: any) {
    this.modalSoccerPitchReservation.personCompanyId = $event.id;
  }

  searchPersonCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.personCompanyService.filterAsync(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  formatter = (x: { name: string }) => x.name;

  getSoccerPitchs() {
    this.soccerpitchService.getSoccerPitchs(1, 99).subscribe(
      (res) => {
        this.soccerPitchs = res.data;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  getPlansBySoccerPitchId(id: any) {
    this.soccerpitchplanService.getSoccerPitchPlanBySoccerPitchId(id).subscribe(
      (res) => {
        this.soccerPitchsPlans = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  selectSoccerPitch($event: any) {
    this.modalSoccerPitchReservation.soccerPitchId = $event;
    this.getPlansBySoccerPitchId($event);
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
  sendRequest() {
    this.transformData();
    this.modalSoccerPitchReservation.application = 3;
    if (this.isEditting) {
      this.scheduleService
        .patchSoccerPitchReservation(this.modalSoccerPitchReservation)
        .subscribe(
          (data) => {
            this.toastService.showSuccess(
              "Agendamento atualizado com sucesso."
            );
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao cadastrar agendamento. " + error.message
            );
          }
        );
    } else {
      this.scheduleService
        .postSoccerPitchReservation(this.modalSoccerPitchReservation)
        .subscribe(
          (data) => {
            if (data && data.childReservations) {
              let modalRef = this.modalService.open(
                ReservationListModalComponent,
                { size: "lg" }
              );
              modalRef.componentInstance.childReservation =
                data.childReservations;
            }
            this.toastService.showSuccess("Agendamento inserido com sucesso.");
            this.modalSoccerPitchReservation = new SoccerPitchReservation();
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao cadastrar agendamento. " + error.error.message
            );
          }
        );
    }
  }

  getReservationInfo() {
    this.scheduleService.getReservationInfo(this.reservationId).subscribe(
      (res) => {
        this.modalSoccerPitchReservation = res;
        this.reservationInfo = res;
        this.modalSoccerPitchReservation.selectedUser = {};
        this.fitDataToFront();
        this.getPlansBySoccerPitchId(
          this.modalSoccerPitchReservation.soccerPitchId
        );
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.message
        );
      }
    );
  }

  changeStatus(status) {
    this.scheduleService.changeStatus(this.reservationId, status).subscribe(
      (res) => {
        this.toastService.showSuccess("Status atualizado com sucesso.");
        this.activeModal.close();
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.message
        );
      }
    );
  }

  openChildrenReservations() {
    let modalRef = this.modalService.open(ReservationsByPlanConfigComponent, {
      size: "lg",
    });
    modalRef.componentInstance.reservationId = this.reservationId;
  }

  openReservationPayments() {
    let modalRef = this.modalService.open(ReservationPaymentsModalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.reservationId = this.reservationId;
  }
}
