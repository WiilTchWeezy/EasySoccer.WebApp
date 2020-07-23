import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../service/company.service";
import { Router } from "@angular/router";
import { ToastserviceService } from "../../service/toastservice.service";
import { ImageService } from "../../service/image.service";
import { Address } from "ngx-google-places-autocomplete/objects/address";

@Component({
  selector: "app-company-info",
  templateUrl: "./company-info.component.html",
  styleUrls: ["./company-info.component.css"],
})
export class CompanyInfoComponent implements OnInit {
  name: string;
  description: string;
  completeAddress: string;
  completeAddressMaps: string;
  cnpj: string;
  loading: boolean = false;
  companySchedules: any[];
  companyImageUrl: any;
  selectedImage: any;
  selectedImageBase64: any;
  options: any = {
    types: [],
    componentRestrictions: { country: "BR" },
  };
  longitude: any;
  latitude: any;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastserviceService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.companyService.getCompanyInfo().subscribe(
      (res) => {
        this.name = res.name;
        this.description = res.description;
        this.completeAddress = res.completeAddress;
        this.completeAddressMaps = res.completeAddress;
        this.cnpj = res.cnpj;
        this.companySchedules = res.companySchedules;
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        this.companyImageUrl = this.imageService.getImageUrlByImageName(
          res.logo,
          "company"
        );
      },
      (error) => {
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
        this.companySchedules,
        this.longitude,
        this.latitude
      )
      .subscribe(
        (res) => {
          this.toastService.showSuccess("Empresa atualizada com sucesso.");
          this.router.navigate(["/"]);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.toastService.showError(error.error);
          this.loading = false;
        }
      );
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
        this.companyImageUrl = reader.result;
        let base64Splitted = this.selectedImage.split(",");
        if (base64Splitted.length > 0) {
          this.selectedImageBase64 = base64Splitted[1];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  sendImageBase64() {
    this.companyService
      .postSoccerPitchImage(this.selectedImageBase64)
      .subscribe(
        (res) => {
          this.toastService.showSuccess("Imagem salva com sucesso. ");
          this.getCompanyInfo();
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  public handleAddressChange(address: Address) {
    this.longitude = address.geometry.location.lng();
    this.latitude = address.geometry.location.lat();
  }
}
