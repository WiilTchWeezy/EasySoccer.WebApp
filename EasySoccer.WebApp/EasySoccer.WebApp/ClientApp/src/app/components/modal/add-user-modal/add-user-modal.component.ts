import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "../../../model/user";
import { ToastserviceService } from "../../../service/toastservice.service";
import { PersonCompanyService } from "../../../service/person-company.service";

@Component({
  selector: "app-add-user-modal",
  templateUrl: "./add-user-modal.component.html",
  styleUrls: ["./add-user-modal.component.css"],
})
export class AddUserModalComponent implements OnInit {
  ngOnInit() {}
  user: User;
  constructor(
    public activeModal: NgbActiveModal,
    public personCompanyService: PersonCompanyService,
    private toastService: ToastserviceService
  ) {
    this.user = new User("", "", "", "");
  }
  save() {
    this.personCompanyService.createAsync(this.user).subscribe(
      (data) => {
        this.toastService.showSuccess("Cliente inserido com sucesso!");
        this.activeModal.close(data);
      },
      (error) => {
        this.toastService.showError(
          "Erro ao cadastrar usuário. " + error.error.Message
        );
      }
    );
  }
}
