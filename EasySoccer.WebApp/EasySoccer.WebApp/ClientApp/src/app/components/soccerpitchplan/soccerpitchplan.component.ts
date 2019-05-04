import { Component, OnInit } from '@angular/core';
import { SoccerpitchplanService } from '../../service/soccerpitchplan.service';
import { Soccerpitchplan } from '../../model/soccerpitchplan';

@Component({
	selector: 'app-soccerpitchplan',
	templateUrl: './soccerpitchplan.component.html',
	styleUrls: [ './soccerpitchplan.component.css' ]
})
export class SoccerpitchplanComponent implements OnInit {
	soccerPitchPlans: Soccerpitchplan[];

	constructor(private soccerPitchPlanService: SoccerpitchplanService) {}

	ngOnInit() {
		this.soccerPitchPlanService.getSoccerPitchPlan().subscribe(
			(res) => {
				this.soccerPitchPlans = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
