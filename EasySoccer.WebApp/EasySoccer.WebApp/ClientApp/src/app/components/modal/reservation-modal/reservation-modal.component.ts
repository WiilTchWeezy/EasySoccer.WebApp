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
import { UserService } from "../../../service/user.service";
import { SoccerpitchService } from "../../../service/soccerpitch.service";
import { SoccerpitchplanService } from "../../../service/soccerpitchplan.service";
import { ToastserviceService } from "../../../service/toastservice.service";
import { Soccerpitch } from "../../../model/soccerpitch";
import { Soccerpitchplan } from "../../../model/soccerpitchplan";
import { CustomDateParserFormatter } from "../../../service/adapter/CustomDateParseAdapter";
import { ScheduleService } from "../../../service/schedule.service";

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
    public userService: UserService,
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
    this.modalSoccerPitchReservation.selectedDate = this.reservationInfo.selectedDateStart;
    this.modalSoccerPitchReservation.userName = this.reservationInfo.personName;
    this.modalSoccerPitchReservation.userPhone = this.reservationInfo.personPhone;
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
      id: this.modalSoccerPitchReservation.personId,
    };
    if (this.modalSoccerPitchReservation.userPhone) {
      this.modalSoccerPitchReservation.selectedUser.name +=
        "(" + this.modalSoccerPitchReservation.userPhone + ")";
    }
  }

  openUserModal() {
    this.modalService.open(AddUserModalComponent).result.then(
      (result) => {
        this.modalSoccerPitchReservation.personId = result.personId;
        this.modalSoccerPitchReservation.selectedUser = {
          name: result.name + " (" + result.phone + ")",
          personId: result.personId,
        };
      },
      (reason) => {}
    );
  }

  selectUser($event: any) {
    this.modalSoccerPitchReservation.personId = $event.id;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.userService.filterAsync(term).pipe(
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
    this.soccerpitchService.getSoccerPitchs().subscribe(
      (res) => {
        this.soccerPitchs = res;
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
      debugger;
      this.scheduleService
        .postSoccerPitchReservation(this.modalSoccerPitchReservation)
        .subscribe(
          (data) => {
            this.toastService.showSuccess("Agendamento inserido com sucesso.");
            this.modalSoccerPitchReservation = new SoccerPitchReservation();
            this.activeModal.close();
          },
          (error) => {
            console.log(error);
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
}
