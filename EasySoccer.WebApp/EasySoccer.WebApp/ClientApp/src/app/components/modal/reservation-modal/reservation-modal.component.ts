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
  soccerPitchs: Soccerpitch[];
  soccerPitchsPlans: Soccerpitchplan[];

  constructor(
    private modalService: NgbModal,
    public userService: UserService,
    public activeModal: NgbActiveModal,
    public soccerpitchService: SoccerpitchService,
    public soccerpitchplanService: SoccerpitchplanService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    if (
      this.modalSoccerPitchReservation &&
      this.modalSoccerPitchReservation.soccerPitchId
    ) {
      this.getPlansBySoccerPitchId(
        this.modalSoccerPitchReservation.soccerPitchId
      );
    }
    this.getSoccerPitchs();
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
}
