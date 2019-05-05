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

	openModal(content: any, planId: number) {
		this.planId = planId;
		if (this.planId > 0) {
			this.modalTitle = 'Editar plano';
		} else {
			this.modalTitle = 'Adicionar novo plano';
		}
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				if (this.planId > 0) {
					this.modalSelectedPlan.id = this.planId;
					this.soccerPitchPlanService.patchSoccerPitchPlan(this.modalSelectedPlan).subscribe(
						(data) => {
							this.getPlans();
						},
						(error) => {}
					);
				} else {
					this.soccerPitchPlanService.postSoccerPitchPlan(this.modalSelectedPlan).subscribe(
						(data) => {
							this.getPlans();
						},
						(error) => {}
					);
				}
			},
			(reason) => {}
		);
	}
}
