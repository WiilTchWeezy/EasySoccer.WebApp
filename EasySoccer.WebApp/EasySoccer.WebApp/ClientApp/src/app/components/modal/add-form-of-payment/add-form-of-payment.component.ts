import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../../service/toastservice.service";
import { FormOfPaymentService } from "../../../service/form-of-payment.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-form-of-payment",
  templateUrl: "./add-form-of-payment.component.html",
  styleUrls: ["./add-form-of-payment.component.css"],
})
export class AddFormOfPaymentComponent implements OnInit {
  selectedFormOfPayment: any = null;
  name: string = "";
  active: boolean;

  heroForm: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private formOfPaymentService: FormOfPaymentService,
    private toastService: ToastserviceService
  ) {
    this.heroForm = new FormBuilder().group({
      name: new FormControl(this.name, [Validators.required]),
      active: new FormControl(this.active, [Validators.required]),
    });
  }

  ngOnInit() {
    debugger;
    if (this.selectedFormOfPayment) {
      this.name = this.selectedFormOfPayment.name;
      this.active = this.selectedFormOfPayment.active;
      let nameControl = this.heroForm.get("name");
      let activeControl = this.heroForm.get("active");
      nameControl.setValue(this.name);
      activeControl.setValue(this.active);
    }

    // this.heroForm = new FormGroup(
    //   {
    //     name: new FormControl(this.name, [Validators.required]),
    //   },
    //   { validators: Validators.required }
    // );
  }

  updateValues() {
    let nameControl = this.heroForm.get("name");
    let activeControl = this.heroForm.get("active");
    this.name = nameControl.value;
    this.active = activeControl.value;
  }

  save() {
    this.heroForm.markAllAsTouched();
    if (this.heroForm.valid) {
      this.updateValues();
      if (this.selectedFormOfPayment) {
        this.formOfPaymentService
          .patchFormOfPayment(
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
          .postFormOfPayment(this.name, this.active)
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
}
