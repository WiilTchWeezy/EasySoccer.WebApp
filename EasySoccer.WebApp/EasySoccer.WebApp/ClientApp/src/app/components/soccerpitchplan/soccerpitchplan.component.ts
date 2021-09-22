import { Component, OnInit } from "@angular/core";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../service/toastservice.service";
import { SoccerpitchplanModalComponent } from "../modal/soccerpitchplan-modal/soccerpitchplan-modal.component";

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
    let modalRef = this.modalService.open(SoccerpitchplanModalComponent);
    if (selectedPlan) {
      modalRef.componentInstance.modalSelectedPlan = selectedPlan;
    }
  }
}
