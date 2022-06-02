import { Component, OnInit } from "@angular/core";
import { ToastserviceService } from "../../service/toastservice.service";
import { ReservationsPaymentService } from "../../service/reservations-payment.service";
import { NgbDateParserFormatter, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationPaymentInfoModalComponent } from "../modal/reservation-payment-info-modal/reservation-payment-info-modal.component";
import { CustomDateParserFormatter } from "../../service/adapter/CustomDateParseAdapter";
import { FormOfPaymentService } from "../../service/form-of-payment.service";

@Component({
  selector: "app-reservation-payments",
  templateUrl: "./reservation-payments.component.html",
  styleUrls: ["./reservation-payments.component.css"],
  providers: [
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class ReservationPaymentsComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  payments: Array<any> = new Array<any>();
  startDate: Date = null;
  endDate: Date = null;
  formOfPayment: number = 0;
  formOfPayments: Array<any> = new Array<any>();
  status: number = 0;
  personCompanyName: string;
  constructor(
    private reservationsPaymentService: ReservationsPaymentService,
    private toastService: ToastserviceService,
    private modalService: NgbModal,
    private formOfPaymentService: FormOfPaymentService
  ) {}

  ngOnInit() {
    this.getPayments();
    this.getFormOfPayment();
  }

  getPayments() {
    this.reservationsPaymentService
      .getPaymentsByFilter(
        this.startDate,
        this.endDate,
        this.formOfPayment,
        this.status,
        this.personCompanyName,
        this.page,
        this.pageSize
      )
      .subscribe(
        (res) => {
          this.payments = res.data;
          this.collectionSize = res.total;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  openModal(payment) {
    let modalRef = this.modalService.open(ReservationPaymentInfoModalComponent);
    modalRef.componentInstance.payment = payment;
    modalRef.result.then(
      (ok) => {
        this.getPayments();
      },
      (reject) => {
        this.getPayments();
      }
    );
  }

  getFormOfPayment() {
    this.formOfPaymentService.getFormOfPaymentsDropDown().subscribe(
      (res) => {
        this.formOfPayments = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }
}
