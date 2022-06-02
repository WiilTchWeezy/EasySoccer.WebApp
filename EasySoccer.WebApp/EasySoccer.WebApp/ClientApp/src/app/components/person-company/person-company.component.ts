import { Component, OnInit } from "@angular/core";
import { PersonCompanyService } from "../../service/person-company.service";
import { ToastserviceService } from "../../service/toastservice.service";
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { PersonCompanyModalComponent } from "../modal/person-company-modal/person-company-modal.component";

@Component({
  selector: "app-person-company",
  templateUrl: "./person-company.component.html",
  styleUrls: ["./person-company.component.css"],
})
export class PersonCompanyComponent implements OnInit {
  page = 1;
  pageSize = 10;
  email: string = "";
  name: string = "";
  phone: string = "";
  personCompanies: any[] = [];
  filter: any = {};
  collectionSize: number = 0;
  modalOption: NgbModalOptions = {};

  constructor(
    private personCompanyService: PersonCompanyService,
    private toastService: ToastserviceService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.getPersonCompany();
  }

  getPersonCompany() {
    this.personCompanyService
      .getAsync(this.page, this.pageSize, this.email, this.name, this.phone)
      .subscribe(
        (res) => {
          this.personCompanies = res.data;
          this.collectionSize = res.total;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.error.message
          );
        }
      );
  }

  openModal(person) {
    this.modalOption.backdrop = "static";
    this.modalOption.keyboard = false;
    this.modalOption.ariaLabelledBy = "modal-basic-title";
    this.modalOption.size = "lg";
    const modalRef = this.modalService.open(
      PersonCompanyModalComponent,
      this.modalOption
    );
    modalRef.result.then(
      (result) => {},
      (reason) => {}
    );
    if (person) {
      modalRef.componentInstance.personId = person.id;
    }
  }
}
