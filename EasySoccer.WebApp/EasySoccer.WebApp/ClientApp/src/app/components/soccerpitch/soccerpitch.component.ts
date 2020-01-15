import { Component, OnInit, ViewChild } from "@angular/core";
import { SoccerpitchService } from "../../service/soccerpitch.service";
import { SoccerpitchplanService } from "../../service/soccerpitchplan.service";
import { Soccerpitch } from "../../model/soccerpitch";
import { Soccerpitchplan } from "../../model/soccerpitchplan";
import { Soccerpitchsoccerpitchplan } from "../../model/soccerpitchsoccerpitchplan";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastserviceService } from "../../service/toastservice.service";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

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
  selectedPlans: Soccerpitchplan[] = [];
  sportTypes: any[];
  selectedSportType: any;

  @ViewChild("input", null) inputEl;

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
    this.getSportTypes();
    this.soccerPitchsplansControl = [];
  }

  getSoccerpitchs() {
    this.soccerPitchService.getSoccerPitchs().subscribe(
      res => {
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

  getSportTypes() {
    this.soccerPitchService.getSportTypes().subscribe(
      res => {
        this.sportTypes = res;
      },
      error => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  formatter = (result: any) => result.name;
  inputFormmatter = (x: { name: string }) => {
    this.modalSoccerPitch.sportType = x;
    return x.name;
  };
  searchSportType = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        return term.length <= 1
          ? []
          : this.sportTypes
              .filter(
                v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10);
      })
    );

  selectChange($event: any, planControl: Soccerpitchsoccerpitchplan) {
    planControl.soccerPitchPlanId = $event.id;
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
    if (selectedSoccerPitch != null && selectedSoccerPitch.id > 0) {
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
      }
    }

    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          if (this.modalSoccerPitch && this.modalSoccerPitch.sportType) {
            this.modalSoccerPitch.sportTypeId = this.modalSoccerPitch.sportType.id;
          }
          if (selectedSoccerPitch != null && selectedSoccerPitch.id > 0) {
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

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const matchRegExp = new RegExp(term, "gi");
        return term.length === 0
          ? []
          : this.soccerPitchsplans.filter(v => {
              var currentPlans = this.modalSoccerPitch.soccerPitchSoccerPitchPlans.map(
                item => {
                  return item.soccerPitchPlan.id;
                }
              );
              console.log(currentPlans);
              return (
                currentPlans.indexOf(v.id) == -1 && matchRegExp.test(v.name)
              );
            });
      })
    );

  selected($e) {
    $e.preventDefault();
    this.selectedPlans.push($e.item);
    let itemToPush = new Soccerpitchsoccerpitchplan();
    itemToPush.soccerPitchPlanId = $e.item.id;
    itemToPush.soccerPitchPlan = $e.item;
    this.modalSoccerPitch.soccerPitchSoccerPitchPlans.push(itemToPush);
    console.log(this.selectedPlans);
  }

  close(item) {
    this.selectedPlans.splice(this.selectedPlans.indexOf(item), 1);
    this.removePlan(null, item);
  }
}
