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
  loading: boolean = false;
  companySchedules: any[];
  daysDescription: string[] = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta Feira",
    "Sexta-Feira",
    "Sabado"
  ];
  hoursOptions: any[] = [];
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.hoursOptions.push({ key: 0, value: "00:00" });
    this.hoursOptions.push({ key: 1, value: "01:00" });
    this.hoursOptions.push({ key: 2, value: "02:00" });
    this.hoursOptions.push({ key: 3, value: "03:00" });
    this.hoursOptions.push({ key: 4, value: "04:00" });
    this.hoursOptions.push({ key: 5, value: "05:00" });
    this.hoursOptions.push({ key: 6, value: "06:00" });
    this.hoursOptions.push({ key: 7, value: "07:00" });
    this.hoursOptions.push({ key: 8, value: "08:00" });
    this.hoursOptions.push({ key: 9, value: "09:00" });
    this.hoursOptions.push({ key: 10, value: "10:00" });
    this.hoursOptions.push({ key: 11, value: "11:00" });
    this.hoursOptions.push({ key: 12, value: "12:00" });
    this.hoursOptions.push({ key: 13, value: "13:00" });
    this.hoursOptions.push({ key: 14, value: "14:00" });
    this.hoursOptions.push({ key: 15, value: "15:00" });
    this.hoursOptions.push({ key: 16, value: "16:00" });
    this.hoursOptions.push({ key: 17, value: "17:00" });
    this.hoursOptions.push({ key: 18, value: "18:00" });
    this.hoursOptions.push({ key: 19, value: "19:00" });
    this.hoursOptions.push({ key: 20, value: "20:00" });
    this.hoursOptions.push({ key: 21, value: "21:00" });
    this.hoursOptions.push({ key: 22, value: "22:00" });
    this.hoursOptions.push({ key: 23, value: "23:00" });
    this.companyService.getCompanyInfo().subscribe(
      res => {
        this.name = res.name;
        this.description = res.description;
        this.completeAddress = res.completeAddress;
        this.cnpj = res.cnpj;
        this.companySchedules = res.companySchedules;
      },
      error => {
        this.toastService.showError(error.error);
      }
    );
  }

  saveCompany() {
    this.loading = true;
    this.companyService
      .updateCompanyInfo(
        this.name,
        this.description,
        this.cnpj,
        this.completeAddress,
        this.companySchedules
      )
      .subscribe(
        res => {
          this.toastService.showSuccess("Empresa atualizada com sucesso.");
          this.router.navigate(["/"]);
          this.loading = false;
        },
        error => {
          this.toastService.showError(error.error);
          this.loading = false;
        }
      );
  }
}
