import { Component, OnInit } from "@angular/core";
import { SoccerpitchService } from "../../service/soccerpitch.service";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitch } from "../../model/soccerpitch";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { Soccerpitchsoccerpitchplan } from "../../model/soccerpitchsoccerpitchplan";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../service/toastservice.service";

@Component({
  selector: "app-soccerpitch",
  templateUrl: "./soccerpitch.component.html",
  styleUrls: ["./soccerpitch.component.css"]
})
export class SoccerpitchComponent implements OnInit {
  soccerPitchs: Soccerpitch[];
  soccerPitchsplans: Soccerpitchplan[];
  soccerPitchsplansControl: Soccerpitchsoccerpitchplan[];
  soccerPitchsplan: Soccerpitchplan;
  modalTitle: String;
  modalSoccerPitch: Soccerpitch;

  constructor(
    private soccerPitchService: SoccerpitchService,
    private modalService: NgbModal,
    private soccerPitchPlanService: SoccerpitchplanService,
    private toastService: ToastserviceService
  ) {
    this.modalSoccerPitch = new Soccerpitch();
  }

  ngOnInit() {
    this.getSoccerpitchs();
    this.getSoccerpitchsplans();
    this.soccerPitchsplansControl = [];
  }

  getSoccerpitchs() {
    this.soccerPitchService.getSoccerPitchs().subscribe(
      res => {
        console.log(res);
        this.soccerPitchs = res;
      },
      error => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  getSoccerpitchsplans() {
    this.soccerPitchPlanService.getSoccerPitchPlan().subscribe(
      response => {
        this.soccerPitchsplans = response;
      },
      error => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  selectChange($event: any, planControl: Soccerpitchsoccerpitchplan) {
    planControl.soccerPitchPlanId = $event.id;
    console.log($event.id);
    console.log(planControl);
  }

  addPlan($event: any) {
    this.modalSoccerPitch.soccerPitchSoccerPitchPlans.push(
      new Soccerpitchsoccerpitchplan()
    );
  }

  removePlan($event: any, planControl: Soccerpitchsoccerpitchplan) {
    let index = this.modalSoccerPitch.soccerPitchSoccerPitchPlans.indexOf(
      planControl
    );
    if (index !== -1) {
      this.modalSoccerPitch.soccerPitchSoccerPitchPlans.splice(index, 1);
    }
  }

  openModal(content: any, selectedSoccerPitch: Soccerpitch) {
    console.log(selectedSoccerPitch);
    if (selectedSoccerPitch.id > 0) {
      this.modalTitle = "Editar quadra";
      this.modalSoccerPitch = selectedSoccerPitch;
    } else {
      this.modalSoccerPitch = new Soccerpitch();
      this.modalTitle = "Adicionar nova quadra";
      if (
        this.modalSoccerPitch.soccerPitchSoccerPitchPlans == undefined ||
        this.modalSoccerPitch.soccerPitchSoccerPitchPlans.length == 0
      ) {
        this.modalSoccerPitch.soccerPitchSoccerPitchPlans = [];
        this.modalSoccerPitch.soccerPitchSoccerPitchPlans.push(
          new Soccerpitchsoccerpitchplan()
        );
      }
    }
    console.log(this.modalSoccerPitch);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          if (selectedSoccerPitch.id > 0) {
            this.soccerPitchService
              .patchSoccerPitch(this.modalSoccerPitch)
              .subscribe(
                data => {
                  this.toastService.showSuccess(
                    "Quadra atualizada com sucesso!"
                  );
                  this.getSoccerpitchs();
                  this.modalSoccerPitch = new Soccerpitch();
                },
                error => {
                  this.toastService.showError(
                    "Erro ao atualizar dados. " + error.Message
                  );
                }
              );
          } else {
            this.soccerPitchService
              .postSoccerPitch(this.modalSoccerPitch)
              .subscribe(
                data => {
                  this.toastService.showSuccess("Quadra inserida com sucesso!");
                  this.getSoccerpitchs();
                  this.modalSoccerPitch = new Soccerpitch();
                },
                error => {
                  this.toastService.showError(
                    "Erro ao inserir dados. " + error.Message
                  );
                }
              );
          }
        },
        reason => {}
      );
  }
}
