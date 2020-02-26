import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../service/company.service";
import { Router } from "@angular/router";
import { ToastserviceService } from "../../service/toastservice.service";

@Component({
  selector: "app-company-info",
  templateUrl: "./company-info.component.html",
  styleUrls: ["./company-info.component.css"]
})
export class CompanyInfoComponent implements OnInit {
  name: string;
  description: string;
  completeAddress: string;
  cnpj: string;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.companyService.getCompanyInfo().subscribe(
      res => {
        this.name = res.name;
        this.description = res.description;
        this.completeAddress = res.completeAddress;
        this.cnpj = res.cnpj;
      },
      error => {
        this.toastService.showError(error.error);
      }
    );
  }

  saveCompany() {
    this.companyService
      .updateCompanyInfo(
        this.name,
        this.description,
        this.cnpj,
        this.completeAddress
      )
      .subscribe(
        res => {
          this.toastService.showSuccess("Empresa atualizada com sucesso.");
          this.router.navigate(["/"]);
        },
        error => {
          this.toastService.showError(error.error);
        }
      );
  }
}
