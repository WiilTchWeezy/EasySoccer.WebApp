import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationsPaymentService } from "../../../service/reservations-payment.service";
import { ScheduleService } from "../../../service/schedule.service";
import { ToastserviceService } from "../../../service/toastservice.service";
import { ReservationPaymentsModalComponent } from "../reservation-payments-modal/reservation-payments-modal.component";

@Component({
  selector: "app-reservation-payment-info-modal",
  templateUrl: "./reservation-payment-info-modal.component.html",
  styleUrls: ["./reservation-payment-info-modal.component.css"],
})
export class ReservationPaymentInfoModalComponent implements OnInit {
  payment: any = {};
  reservationInfo: any = {};
  constructor(
    private toastService: ToastserviceService,
    private scheduleService: ScheduleService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private paymentService: ReservationsPaymentService
  ) {}

  ngOnInit() {
    if (this.payment && this.payment.soccerPitchReservationId) {
      this.getReservationInfo(this.payment.soccerPitchReservationId);
    }
  }

  getReservationInfo(reservationId) {
    this.scheduleService.getReservationInfo(reservationId).subscribe(
      (res) => {
        this.reservationInfo = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.message
        );
      }
    );
  }

  openReservationPayments() {
    if (this.payment && this.payment.soccerPitchReservationId) {
      let modalRef = this.modalService.open(ReservationPaymentsModalComponent, {
        size: "xl",
      });
      modalRef.componentInstance.reservationId =
        this.payment.soccerPitchReservationId;
    }
  }

  cancelPayment() {
    if (this.payment) {
      this.paymentService.cancelPayment(this.payment.id).subscribe(
        (res) => {
          this.toastService.showSuccess("Pagamento cancelado com sucesso. ");
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
}
