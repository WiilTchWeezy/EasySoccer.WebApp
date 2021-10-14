import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../../service/toastservice.service";
import { FormOfPaymentService } from "../../../service/form-of-payment.service";

@Component({
  selector: "app-add-form-of-payment",
  templateUrl: "./add-form-of-payment.component.html",
  styleUrls: ["./add-form-of-payment.component.css"],
})
export class AddFormOfPaymentComponent implements OnInit {
  selectedFormOfPayment: any = null;
  name: string;
  active: boolean;
  constructor(
    private activeModal: NgbActiveModal,
    private formOfPaymentService: FormOfPaymentService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    if (this.selectedFormOfPayment) {
      this.name = this.selectedFormOfPayment.name;
      this.active = this.selectedFormOfPayment.active;
    }
  }

  save() {
    if (this.selectedFormOfPayment) {
      this.formOfPaymentService
        .patchSoccerPitchPlan(
          this.name,
          this.active,
          this.selectedFormOfPayment.id
        )
        .subscribe(
          (res) => {
            this.toastService.showSuccess(
              "Forma de pagamento atualizada com sucesso."
            );
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao consultar dados. " + error.error.Message
            );
          }
        );
    } else {
      this.formOfPaymentService
        .postSoccerPitchPlan(this.name, this.active)
        .subscribe(
          (res) => {
            this.toastService.showSuccess(
              "Forma de pagamento inserida com sucesso."
            );
            this.activeModal.close();
          },
          (error) => {
            this.toastService.showError(
              "Erro ao consultar dados. " + error.error.Message
            );
          }
        );
    }
  }
}
