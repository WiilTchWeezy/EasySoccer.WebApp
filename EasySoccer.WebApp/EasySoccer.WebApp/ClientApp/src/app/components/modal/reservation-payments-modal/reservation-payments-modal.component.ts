import { Component, OnInit } from "@angular/core";
import { ToastserviceService } from "../../../service/toastservice.service";
import { ReservationsPaymentService } from "../../../service/reservations-payment.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddReservationPaymentComponent } from "../add-reservation-payment/add-reservation-payment.component";
import { ConfirmModalComponent } from "../confirm-modal/confirm-modal.component";

@Component({
  selector: "app-reservation-payments-modal",
  templateUrl: "./reservation-payments-modal.component.html",
  styleUrls: ["./reservation-payments-modal.component.css"],
})
export class ReservationPaymentsModalComponent implements OnInit {
  reservationId: any;
  payments: Array<any> = new Array<any>();
  status: number = 0;
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
      .getReservationPayments(this.reservationId, this.status)
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

  cancelPayment(payment) {
    let modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.text =
      "Tem certeza que deseja cancelar este pagamento?";
    modalRef.componentInstance.yesText = "Sim";
    modalRef.componentInstance.noText = "Não";
    modalRef.result.then(
      (res) => {
        if (payment) {
          this.reservationPaymentService.cancelPayment(payment.id).subscribe(
            (res) => {
              this.toastService.showSuccess("Pagamento cancelado com sucesso!");
              modalRef.close();
              this.getPayments();
            },
            (error) => {
              this.toastService.showError(error.error.message);
            }
          );
        }
      },
      (error) => {
        modalRef.close();
      }
    );
  }
}
