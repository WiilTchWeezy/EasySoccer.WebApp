import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PlanGenerationConfigService } from "../../../service/plan-generation-config.service";
import { ToastserviceService } from "../../../service/toastservice.service";

@Component({
  selector: "app-plan-generation-config-modal",
  templateUrl: "./plan-generation-config-modal.component.html",
  styleUrls: ["./plan-generation-config-modal.component.css"],
})
export class PlanGenerationConfigModalComponent implements OnInit {
  modalTitle: string;
  currentPlanConfig: any = {};
  constructor(
    public activeModal: NgbActiveModal,
    private toastService: ToastserviceService,
    private planConfigService: PlanGenerationConfigService
  ) {}

  ngOnInit() {
    if (
      this.currentPlanConfig &&
      this.currentPlanConfig.id &&
      this.currentPlanConfig.id > 0
    ) {
      this.modalTitle = "Editar config. de plano";
    } else {
      this.modalTitle = "Adicionar nova config. de plano";
    }
  }

  save() {
    if (
      this.currentPlanConfig &&
      this.currentPlanConfig.id &&
      this.currentPlanConfig.id > 0
    ) {
      this.planConfigService.patchPlanConfig(this.currentPlanConfig).subscribe(
        (res) => {
          this.toastService.showSuccess(
            "Configuração de plano inserida com sucesso!"
          );
          this.activeModal.close();
        },
        (error) => {
          this.toastService.showError(
            "Erro ao atualizar configuração de plano. " + error.error.Message
          );
        }
      );
    } else {
      this.planConfigService.postPlanConfig(this.currentPlanConfig).subscribe(
        (res) => {
          this.toastService.showSuccess(
            "Configuração de plano atualizado com sucesso!"
          );
          this.activeModal.close();
        },
        (error) => {
          this.toastService.showError(
            "Erro ao inserir configuração de plano. " + error.error.Message
          );
        }
      );
    }
  }
}
