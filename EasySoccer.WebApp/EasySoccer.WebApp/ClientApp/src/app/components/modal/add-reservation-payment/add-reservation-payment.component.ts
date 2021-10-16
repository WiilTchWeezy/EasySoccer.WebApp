import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { FormOfPaymentService } from "../../../service/form-of-payment.service";
import { ReservationsPaymentService } from "../../../service/reservations-payment.service";
import { ToastserviceService } from "../../../service/toastservice.service";
import { PersonCompanyService } from "../../../service/person-company.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
} from "rxjs/operators";
import { AddUserModalComponent } from "../add-user-modal/add-user-modal.component";

@Component({
  selector: "app-add-reservation-payment",
  templateUrl: "./add-reservation-payment.component.html",
  styleUrls: ["./add-reservation-payment.component.css"],
})
export class AddReservationPaymentComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private reservationPaymentService: ReservationsPaymentService,
    private toastService: ToastserviceService,
    private formOfPaymentService: FormOfPaymentService,
    public personCompanyService: PersonCompanyService,
    private modalService: NgbModal
  ) {}

  formOfPayment: Array<any> = new Array<any>();
  searchFailed = false;
  searching = false;
  selectPersonCompany: any = {};
  personCompanyId: any = {};
  value: number = 0;
  note: string;
  formOfPaymentId: number;
  reservationId: any;
  ngOnInit() {
    this.getFormOfPayments();
  }

  getFormOfPayments() {
    this.formOfPaymentService.getFormOfPaymentsDropDown().subscribe(
      (res) => {
        this.formOfPayment = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao cadastrar usuário. " + error.error.Message
        );
      }
    );
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

  selectUser($event: any) {}

  openUserModal() {
    this.modalService.open(AddUserModalComponent).result.then(
      (result) => {
        this.personCompanyId = result.id;
        this.selectPersonCompany = {
          name: result.name + " (" + result.phone + ")",
          id: result.id,
        };
      },
      (reason) => {}
    );
  }

  save() {
    debugger;
    this.reservationPaymentService
      .postReservationPayment(
        this.value,
        this.selectPersonCompany.id,
        this.note,
        this.formOfPaymentId,
        this.reservationId
      )
      .subscribe(
        (res) => {
          this.toastService.showSuccess("Pagamento inserido com sucesso.");
          this.activeModal.close();
        },
        (error) => {
          this.toastService.showError(
            "Erro ao cadastrar usuário. " + error.error.Message
          );
        }
      );
  }
}
