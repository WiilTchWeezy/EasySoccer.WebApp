import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PlanGenerationConfigService } from "../../service/plan-generation-config.service";
import { ToastserviceService } from "../../service/toastservice.service";
import { PlanGenerationConfigModalComponent } from "../modal/plan-generation-config-modal/plan-generation-config-modal.component";

@Component({
  selector: "app-plan-generation-config",
  templateUrl: "./plan-generation-config.component.html",
  styleUrls: ["./plan-generation-config.component.css"],
})
export class PlanGenerationConfigComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;

  constructor(
    private planGenerationConfigService: PlanGenerationConfigService,
    private toastService: ToastserviceService,
    private modalService: NgbModal
  ) {}
  plansConfig: Array<any> = new Array<any>();
  ngOnInit() {
    this.getPlanGenerationConfigService();
  }

  getPlanGenerationConfigService() {
    this.planGenerationConfigService
      .getPlanGenerationConfig(this.page, this.pageSize)
      .subscribe(
        (res) => {
          this.plansConfig = res.data;
          this.collectionSize = res.total;
        },
        (error) => {
          this.toastService.showError(
            "Erro ao consultar dados. " + error.Message
          );
        }
      );
  }

  openModal(planConfig) {
    let componentRef = this.modalService.open(
      PlanGenerationConfigModalComponent
    );
    componentRef.result.then(
      (full) => {
        this.getPlanGenerationConfigService();
      },
      (reject) => {}
    );

    if (planConfig) {
      componentRef.componentInstance.currentPlanConfig = planConfig;
    }
  }
}
