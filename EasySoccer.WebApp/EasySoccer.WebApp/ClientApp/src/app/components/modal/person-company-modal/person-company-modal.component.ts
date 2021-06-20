import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PersonCompanyService } from "../../../service/person-company.service";
import { ToastserviceService } from "../../../service/toastservice.service";

@Component({
  selector: "app-person-company-modal",
  templateUrl: "./person-company-modal.component.html",
  styleUrls: ["./person-company-modal.component.css"],
})
export class PersonCompanyModalComponent implements OnInit {
  personId: string;
  name: string;
  email: string;
  phone: string;
  reservations: any[] = [];
  isEditting: boolean;
  constructor(
    private activeModal: NgbActiveModal,
    private personCompanyService: PersonCompanyService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.getPersonCompanyInfo();
  }

  getPersonCompanyInfo() {
    if (this.personId) {
      this.isEditting = true;
      this.personCompanyService.getPersonInfoAsync(this.personId).subscribe(
        (res) => {
          this.name = res.name;
          this.phone = res.phone;
          this.email = res.email;
          this.reservations = res.reservations;
        },
        (error) => {
          this.toastService.showError(error.error.message);
        }
      );
    } else {
      this.isEditting = false;
    }
  }

  save() {
    this.activeModal.close();
  }
}
