import { Component, OnInit } from "@angular/core";
import { ToastserviceService } from "../../../service/toastservice.service";
import { ReservationsPaymentService } from "../../../service/reservations-payment.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddReservationPaymentComponent } from "../add-reservation-payment/add-reservation-payment.component";

@Component({
  selector: "app-reservation-payments-modal",
  templateUrl: "./reservation-payments-modal.component.html",
  styleUrls: ["./reservation-payments-modal.component.css"],
})
export class ReservationPaymentsModalComponent implements OnInit {
  reservationId: any;
  payments: Array<any> = new Array<any>();
  constructor(
    private reservationPaymentService: ReservationsPaymentService,
    private toastService: ToastserviceService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPayments();
  }

  getPayments() {
    this.reservationPaymentService
      .getReservationPayments(this.reservationId)
      .subscribe(
        (res) => {
          this.payments = res;
        },
        (error) => {
          this.toastService.showError(error.error.message);
        }
      );
  }

  openAddPaymentModal() {
    let modalRef = this.modalService.open(AddReservationPaymentComponent);
    modalRef.componentInstance.reservationId = this.reservationId;
    modalRef.result.then(
      (res) => {
        this.getPayments();
      },
      (error) => {
        this.getPayments();
      }
    );
  }
}
