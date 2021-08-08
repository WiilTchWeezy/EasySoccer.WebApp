import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../service/company.service";
import { Router } from "@angular/router";
import { ToastserviceService } from "../../service/toastservice.service";
import { ImageService } from "../../service/image.service";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

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
  states: any[] = [];
  cities: any[] = [];
  selectedState: any;
  selectedCity: any;
  financialInfo: any;
  active: boolean;
  insertReservationConfirmed: boolean;
  constructor(
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastserviceService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.getCompanyInfo();
    this.getStates();
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
        this.selectedCity = { id: res.idCity, name: res.city };
        this.selectedState = { id: res.idState, name: res.state };
        this.companyImageUrl = this.imageService.getImageUrlByImageName(
          res.logo,
          "company"
        );
        this.financialInfo = res.financialInfo;
        this.active = res.active;
        this.insertReservationConfirmed = res.insertReservationConfirmed;
      },
      (error) => {
        this.toastService.showError(error.error);
      }
    );
  }

  getStates() {
    this.companyService.getStates().subscribe(
      (res) => {
        this.states = res;
      },
      (error) => {
        this.toastService.showError(error.error);
      }
    );
  }

  getCities() {
    this.companyService.getCitiesByState(this.selectedState.id).subscribe(
      (res) => {
        this.cities = res;
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
        this.latitude,
        this.selectedCity.id,
        this.insertReservationConfirmed
      )
      .subscribe(
        (res) => {
          this.toastService.showSuccess("Empresa atualizada com sucesso.");
          this.router.navigate(["/"]);
          this.loading = false;
        },
        (error) => {
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

  searchState = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.states
          .filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      )
    );

  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.cities
          .filter((v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      )
    );

  formatter = (result: any) => result.name;

  changeSelectedState() {
    this.getCities();
    this.selectedCity = {};
  }

  activeCompany() {
    this.companyService.postActiveCompany(this.active).subscribe(
      (res) => {
        this.toastService.showSuccess("Status atualizado com sucesso. ");
        this.getCompanyInfo();
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.error.message
        );
        this.getCompanyInfo();
      }
    );
  }
}
