import { Component, OnInit, ViewChild } from "@angular/core";
import { SoccerpitchService } from "../../service/soccerpitch.service";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitch } from "../../model/soccerpitch";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { Soccerpitchsoccerpitchplan } from "../../model/soccerpitchsoccerpitchplan";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../service/toastservice.service";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ImageService } from "../../service/image.service";

@Component({
  selector: "app-soccerpitch",
  templateUrl: "./soccerpitch.component.html",
  styleUrls: ["./soccerpitch.component.css"],
})
export class SoccerpitchComponent implements OnInit {
  soccerPitchs: Soccerpitch[];
  soccerPitchsplans: Soccerpitchplan[];
  allSoccerPitchsplans: Soccerpitchplan[];
  soccerPitchsplansControl: Soccerpitchsoccerpitchplan[];
  soccerPitchsplan: Soccerpitchplan;
  modalTitle: String;
  modalSoccerPitch: Soccerpitch;
  selectedPlans: Soccerpitchplan[] = [];
  sportTypes: any[];
  selectedSportType: any;
  currentPlan: any;
  selectedImage: any;
  selectedImageBase64: any;
  selectedImageUrl: any;
  defaultPlanId: any;
  hideSaveImage: boolean;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  @ViewChild("input", null) inputEl;
  currentColor: any = { name: "Laranja", value: "#ff591f" };
  colorsOptions: any[] = [
    {
      name: "Laranja",
      value: "#ff591f",
    },
    {
      name: "Verde",
      value: "#1fff59",
    },
    {
      name: "Azul",
      value: "#1fc5ff",
    },
    {
      name: "Rosa",
      value: "#ff1f55",
    },
    {
      name: "Amarelo",
      value: "#ffc91f",
    },
  ];

  constructor(
    private soccerPitchService: SoccerpitchService,
    private modalService: NgbModal,
    private soccerPitchPlanService: SoccerpitchplanService,
    private toastService: ToastserviceService,
    private imageService: ImageService,
    config: NgbModalConfig
  ) {
    this.modalSoccerPitch = new Soccerpitch();
    this.hideSaveImage = false;
    config.backdrop = "static";
    config.keyboard = false;
  }
  dropdownSettings: IDropdownSettings = {};
  ngOnInit() {
    this.getSoccerpitchs();
    this.getSoccerpitchsplans();
    this.getSportTypes();
    this.soccerPitchsplansControl = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
      selectAllText: "Selecione todos",
      unSelectAllText: "Remove todos",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: "Pesquise",
    };
  }

  getSoccerpitchs() {
    this.soccerPitchService.getSoccerPitchs(this.page, this.pageSize).subscribe(
      (res) => {
        this.soccerPitchs = res.data;
        this.collectionSize = res.total;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  getSoccerpitchsplans() {
    this.soccerPitchPlanService.getSoccerPitchPlan(1, 99).subscribe(
      (response) => {
        this.soccerPitchsplans = response.data;
        this.allSoccerPitchsplans = response.data;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  getSportTypes() {
    this.soccerPitchService.getSportTypes().subscribe(
      (res) => {
        this.sportTypes = res;
      },
      (error) => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  openModal(content: any, selectedSoccerPitch: Soccerpitch) {
    if (selectedSoccerPitch != null && selectedSoccerPitch.id > 0) {
      this.modalTitle = "Editar quadra";
      this.modalSoccerPitch = selectedSoccerPitch;
      this.modalSoccerPitch.plans.map((x) => {
        if (x.isDefault) {
          this.defaultPlanId = x.id;
        }
      });
      var selectedColor;
      if (selectedSoccerPitch.color != null) {
        this.colorsOptions.map(function (item) {
          if (item.value == selectedSoccerPitch.color) {
            selectedColor = item;
            return;
          }
        });
      }

      if (selectedColor) {
        this.currentColor = selectedColor;
      } else {
        this.currentColor = this.colorsOptions[0];
      }
      this.hideSaveImage = false;
    } else {
      this.modalSoccerPitch = new Soccerpitch();
      this.modalTitle = "Adicionar nova quadra";
      this.hideSaveImage = true;
    }
    this.selectedImageUrl = this.imageService.getImageUrlBySoccerPitch(
      this.modalSoccerPitch
    );
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.modalSoccerPitch.plans.map((x) => {
            if (x.id == this.defaultPlanId) {
              x.isDefault = true;
            } else {
              x.isDefault = false;
            }
          });
          if (selectedSoccerPitch != null && selectedSoccerPitch.id > 0) {
            this.modalSoccerPitch.color = this.currentColor.value;
            this.soccerPitchService
              .patchSoccerPitch(this.modalSoccerPitch)
              .subscribe(
                (data) => {
                  this.toastService.showSuccess(
                    "Quadra atualizada com sucesso!"
                  );
                  this.getSoccerpitchs();
                  this.modalSoccerPitch = new Soccerpitch();
                  this.defaultPlanId = null;
                },
                (error) => {
                  this.toastService.showError(
                    "Erro ao atualizar dados. " + error.Message
                  );
                }
              );
          } else {
            this.soccerPitchService
              .postSoccerPitch(this.modalSoccerPitch)
              .subscribe(
                (data) => {
                  this.toastService.showSuccess("Quadra inserida com sucesso!");
                  this.getSoccerpitchs();
                  this.modalSoccerPitch = new Soccerpitch();
                  this.sendImageBase64(data.id);
                  this.defaultPlanId = null;
                },
                (error) => {
                  this.toastService.showError(
                    "Erro ao inserir dados. " + error.Message
                  );
                }
              );
          }
        },
        (reason) => {}
      );
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
        this.selectedImageUrl = reader.result;
        let base64Splitted = this.selectedImage.split(",");
        if (base64Splitted.length > 0) {
          this.selectedImageBase64 = base64Splitted[1];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  sendImageBase64(soccerPitchId) {
    this.soccerPitchService
      .postSoccerPitchImage(this.selectedImageBase64, soccerPitchId)
      .subscribe(
        (res) => {
          this.getSoccerpitchs();
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.error.Message
          );
        }
      );
  }

  updateColorDropDown(dropDownItem: any) {
    this.currentColor = dropDownItem;
    this.modalSoccerPitch.color = dropDownItem.value;
  }
}
