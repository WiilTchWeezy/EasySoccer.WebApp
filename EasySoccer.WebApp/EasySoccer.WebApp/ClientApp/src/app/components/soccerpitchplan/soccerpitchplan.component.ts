import { Component, OnInit } from '@angular/core';
import { SoccerpitchplanService } from '../../service/soccerpitchplan.service';
import { Soccerpitchplan } from '../../model/soccerpitchplan';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-soccerpitchplan',
	templateUrl: './soccerpitchplan.component.html',
	styleUrls: [ './soccerpitchplan.component.css' ]
})
export class SoccerpitchplanComponent implements OnInit {
	soccerPitchPlans: Soccerpitchplan[];
	planId: number;
	modalTitle: String;
	modalSelectedPlan: Soccerpitchplan;

	constructor(private soccerPitchPlanService: SoccerpitchplanService, private modalService: NgbModal) {
		this.modalSelectedPlan = new Soccerpitchplan();
	}
	ngOnInit() {
		this.getPlans();
	}

	getPlans() {
		this.soccerPitchPlanService.getSoccerPitchPlan().subscribe(
			(res) => {
				this.soccerPitchPlans = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	openModal(content: any, selectedPlan: Soccerpitchplan) {
		this.planId = selectedPlan.id;
		if (this.planId > 0) {
			this.modalTitle = 'Editar plano';
			this.modalSelectedPlan = selectedPlan;
		} else {
			this.modalTitle = 'Adicionar novo plano';
			this.modalSelectedPlan = new Soccerpitchplan();
		}
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				if (this.planId > 0) {
					this.modalSelectedPlan.id = this.planId;
					console.log(this.modalSelectedPlan);
					this.soccerPitchPlanService.patchSoccerPitchPlan(this.modalSelectedPlan).subscribe(
						(data) => {
							this.getPlans();
							this.modalSelectedPlan = new Soccerpitchplan();
						},
						(error) => {}
					);
				} else {
					console.log(this.modalSelectedPlan);
					this.soccerPitchPlanService.postSoccerPitchPlan(this.modalSelectedPlan).subscribe(
						(data) => {
							this.getPlans();
							this.modalSelectedPlan = new Soccerpitchplan();
						},
						(error) => {}
					);
				}
			},
			(reason) => {}
		);
	}
}
