import { Component, OnInit } from "@angular/core";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../service/toastservice.service";

@Component({
  selector: "app-soccerpitchplan",
  templateUrl: "./soccerpitchplan.component.html",
  styleUrls: ["./soccerpitchplan.component.css"],
})
export class SoccerpitchplanComponent implements OnInit {
  soccerPitchPlans: Soccerpitchplan[];
  planId: number;
  modalTitle: String;
  modalSelectedPlan: Soccerpitchplan;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(
    private soccerPitchPlanService: SoccerpitchplanService,
    private modalService: NgbModal,
    private toastService: ToastserviceService,
    config: NgbModalConfig
  ) {
    this.modalSelectedPlan = new Soccerpitchplan();
    config.backdrop = "static";
    config.keyboard = false;
  }
  ngOnInit() {
    this.getPlans();
  }

  getPlans() {
    this.soccerPitchPlanService
      .getSoccerPitchPlan(this.page, this.pageSize)
      .subscribe(
        (res) => {
          this.soccerPitchPlans = res.data;
          this.collectionSize = res.total;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  openModal(content: any, selectedPlan: Soccerpitchplan) {
    this.planId = selectedPlan != null ? selectedPlan.id : 0;
    if (this.planId > 0) {
      this.modalTitle = "Editar plano";
      this.modalSelectedPlan = selectedPlan;
    } else {
      this.modalTitle = "Adicionar novo plano";
      this.modalSelectedPlan = new Soccerpitchplan();
    }
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          if (this.planId > 0) {
            this.modalSelectedPlan.id = this.planId;
            console.log(this.modalSelectedPlan);
            this.soccerPitchPlanService
              .patchSoccerPitchPlan(this.modalSelectedPlan)
              .subscribe(
                (data) => {
                  this.toastService.showSuccess(
                    "Plano atualizado com sucesso!"
                  );
                  this.getPlans();
                  this.modalSelectedPlan = new Soccerpitchplan();
                },
                (error) => {
                  this.toastService.showError(
                    "Erro ao consultar dados. " + error.Message
                  );
                }
              );
          } else {
            console.log(this.modalSelectedPlan);
            this.soccerPitchPlanService
              .postSoccerPitchPlan(this.modalSelectedPlan)
              .subscribe(
                (data) => {
                  this.toastService.showSuccess("Plano inserido com sucesso!");
                  this.getPlans();
                  this.modalSelectedPlan = new Soccerpitchplan();
                },
                (error) => {
                  this.toastService.showError(
                    "Erro ao consultar dados. " + error.Message
                  );
                }
              );
          }
        },
        (reason) => {}
      );
  }
}
