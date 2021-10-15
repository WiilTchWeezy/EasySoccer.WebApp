import { Component, OnInit } from "@angular/core";
import { ToastserviceService } from "../../service/toastservice.service";
import { FormOfPaymentService } from "../../service/form-of-payment.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddFormOfPaymentComponent } from "../modal/add-form-of-payment/add-form-of-payment.component";

@Component({
  selector: "app-form-of-payment",
  templateUrl: "./form-of-payment.component.html",
  styleUrls: ["./form-of-payment.component.css"],
})
export class FormOfPaymentComponent implements OnInit {
  formOfPayments: Array<any> = new Array<any>();
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  constructor(
    private formOfPaymentService: FormOfPaymentService,
    private toastService: ToastserviceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getFormOfPayments();
  }

  getFormOfPayments() {
    this.formOfPaymentService
      .getFormOfPayments(this.page, this.pageSize)
      .subscribe(
        (res) => {
          this.formOfPayments = res.data;
          this.collectionSize = res.total;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  openModal(formOfPayment: any) {
    let modalRef = this.modalService.open(AddFormOfPaymentComponent);
    modalRef.componentInstance.selectedFormOfPayment = formOfPayment;
    modalRef.result.then(
      (data) => {
        this.getFormOfPayments();
      },
      (close) => {
        this.getFormOfPayments();
      }
    );
  }
}
