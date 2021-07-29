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
  NgbModalConfig,
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
import { IDropdownSettings } from "ng-multiselect-dropdown";

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
  dropdownSettings: IDropdownSettings = {};
  selectedStatus: any[];
  constructor(
    public scheduleService: ScheduleService,
    private modalService: NgbModal,
    public soccerpitchService: SoccerpitchService,
    public soccerpitchplanService: SoccerpitchplanService,
    public userService: UserService,
    private toastService: ToastserviceService,
    config: NgbModalConfig
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.getSoccerPitchs();
    this.getSoccerPitchsPlans();
    this.dropdownSettings = {
      singleSelection: false,
      idField: "key",
      textField: "text",
      selectAllText: "Selecione todos",
      unSelectAllText: "Remove todos",
      itemsShowLimit: 6,
      allowSearchFilter: true,
      searchPlaceholderText: "Pesquise",
    };
    this.selectedStatus = [
      { key: 1, text: "Aguardando confirmação" },
      { key: 3, text: "Confirmado" },
      { key: 4, text: "Finalizado" },
    ];
    var d = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    this.filter.finalDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: d.getDate(),
    };
    this.filter.initialDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: 1,
    };
    this.getStatus();
    this.getReservations();
  }

  getReservations() {
    this.loading = true;
    var statusSrt = "";
    if (this.selectedStatus) {
      this.selectedStatus.map((x) => {
        statusSrt += x.key + ";";
      });
    }
    console.log(this.filter);
    this.scheduleService
      .getSchedules(
        this.page,
        this.pageSize,
        this.filter.initialDate,
        this.filter.finalDate,
        this.filter.soccerPitchId,
        this.filter.soccerPitchPlanId,
        this.filter.userName,
        statusSrt
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
    this.soccerpitchService.getSoccerPitchs(1, 99).subscribe(
      (res) => {
        this.soccerPitchs = res.data;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.error.message
        );
      }
    );
  }

  getSoccerPitchsPlans() {
    this.soccerpitchplanService.getSoccerPitchPlan(1, 99).subscribe(
      (res) => {
        this.soccerPitchsPlans = res.data;
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
    modalRef.componentInstance.modalSoccerPitchReservation =
      this.modalSoccerPitchReservation;
    modalRef.componentInstance.reservationId =
      this.modalSoccerPitchReservation.id;
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
