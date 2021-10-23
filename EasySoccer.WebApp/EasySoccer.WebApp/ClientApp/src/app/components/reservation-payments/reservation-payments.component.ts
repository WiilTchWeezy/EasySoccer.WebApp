import { Component, OnInit } from "@angular/core";
import { ToastserviceService } from "../../service/toastservice.service";
import { ReservationsPaymentService } from "../../service/reservations-payment.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationPaymentInfoModalComponent } from "../modal/reservation-payment-info-modal/reservation-payment-info-modal.component";

@Component({
  selector: "app-reservation-payments",
  templateUrl: "./reservation-payments.component.html",
  styleUrls: ["./reservation-payments.component.css"],
})
export class ReservationPaymentsComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  payments: Array<any> = new Array<any>();
  startDate: Date = null;
  endDate: Date = null;
  formOfPayment: number = null;
  constructor(
    private reservationsPaymentService: ReservationsPaymentService,
    private toastService: ToastserviceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.reservationsPaymentService
      .getPaymentsByFilter(
        this.startDate,
        this.endDate,
        this.formOfPayment,
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
  }
}
