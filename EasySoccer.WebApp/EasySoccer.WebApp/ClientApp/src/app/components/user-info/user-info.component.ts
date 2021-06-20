import { Component, OnInit } from "@angular/core";
import { CompanyUserService } from "../../service/company-user.service";
import { ToastserviceService } from "../../service/toastservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  loading: boolean = false;
  constructor(
    private companyUserService: CompanyUserService,
    private toastService: ToastserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.companyUserService.getUserInfo().subscribe(
      res => {
        this.name = res.name;
        this.email = res.email;
        this.phone = res.phone;
        this.loading = false;
      },
      error => {
        this.toastService.showError("Ops! ocorreu um erro:" + error.error);
        this.loading = false;
      }
    );
  }

  saveCompany() {
    this.companyUserService.update(this.name, this.email, this.phone).subscribe(
      res => {
        this.toastService.showSuccess("Usuário atualizado com sucesso.");
        this.router.navigate(["/"]);
      },
      error => {
        this.toastService.showError("Ops! ocorreu um erro:" + error.error);
      }
    );
  }
}
