import { Component, OnInit } from '@angular/core';
import { SoccerpitchService } from '../../service/soccerpitch.service';
import { SoccerpitchplanService } from '../../service/soccerpitchplan.service';
import { Soccerpitch } from '../../model/soccerpitch';
import { Soccerpitchplan } from '../../model/soccerpitchplan';
import { Soccerpitchplancontrol } from '../../model/soccerpitchplancontrol';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-soccerpitch',
	templateUrl: './soccerpitch.component.html',
	styleUrls: [ './soccerpitch.component.css' ]
})
export class SoccerpitchComponent implements OnInit {
	soccerPitchs: Soccerpitch[];
	soccerPitchsplans: Soccerpitchplan[];
	soccerPitchsplansControl: Soccerpitchplancontrol[];
	soccerPitchsplan: Soccerpitchplan;
	modalTitle: String;
	modalSoccerPitch: Soccerpitch;

	constructor(
		private soccerPitchService: SoccerpitchService,
		private modalService: NgbModal,
		private soccerPitchPlanService: SoccerpitchplanService
	) {
		this.modalSoccerPitch = new Soccerpitch();
	}

	ngOnInit() {
		this.getSoccerpitchs();
		this.getSoccerpitchsplans();
		this.soccerPitchsplansControl = [];
	}

	getSoccerpitchs() {
		this.soccerPitchService.getSchedules().subscribe(
			(res) => {
				console.log(res);
				this.soccerPitchs = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getSoccerpitchsplans() {
		this.soccerPitchPlanService.getSoccerPitchPlan().subscribe(
			(response) => {
				this.soccerPitchsplans = response;
			},
			(error) => {}
		);
	}

	selectChange($event: any, planControl: Soccerpitchplancontrol) {
		console.log($event);
		planControl.planId = $event.id;
		console.log(this.soccerPitchsplansControl);
		console.log(this.modalSoccerPitch);
	}

	addPlan($event: any) {
		this.soccerPitchsplansControl.push(new Soccerpitchplancontrol());
	}

	removePlan($event: any, planControl: Soccerpitchplancontrol) {
		let index = this.soccerPitchsplansControl.indexOf(planControl);
		if (index !== -1) {
			this.soccerPitchsplansControl.splice(index, 1);
		}
	}

	openModal(content: any, selectedSoccerPitch: Soccerpitch) {
		console.log(selectedSoccerPitch);
		if (selectedSoccerPitch.id > 0) {
			this.modalTitle = 'Editar quadra';
			this.modalSoccerPitch = selectedSoccerPitch;
		} else {
			this.modalSoccerPitch = new Soccerpitch();
			this.modalTitle = 'Adicionar nova quadra';
			if (this.soccerPitchsplansControl.length == 0) {
				this.soccerPitchsplansControl.push(new Soccerpitchplancontrol());
			}
		}
		if (this.soccerPitchsplans.length > 0) {
			for (let i = 0; i < this.soccerPitchsplans.length; i++) {
				if (this.soccerPitchsplans[i].id == selectedSoccerPitch.soccerPitchPlanId) {
					this.soccerPitchsplan = this.soccerPitchsplans[i];
				}
			}
		}
		console.log(this.modalSoccerPitch);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				if (selectedSoccerPitch.id > 0) {
					this.soccerPitchService.patchSoccerPitch(this.modalSoccerPitch).subscribe(
						(data) => {
							this.getSoccerpitchs();
							this.modalSoccerPitch = new Soccerpitch();
						},
						(error) => {}
					);
				} else {
					this.soccerPitchService.postSoccerPitch(this.modalSoccerPitch).subscribe(
						(data) => {
							this.getSoccerpitchs();
							this.modalSoccerPitch = new Soccerpitch();
						},
						(error) => {}
					);
				}
			},
			(reason) => {}
		);
	}
}
