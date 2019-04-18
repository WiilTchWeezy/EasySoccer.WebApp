import { Component, OnInit } from '@angular/core';
import { SoccerpitchService } from '../../service/soccerpitch.service';
import { Soccerpitch } from '../../model/soccerpitch';

@Component({
	selector: 'app-soccerpitch',
	templateUrl: './soccerpitch.component.html',
	styleUrls: [ './soccerpitch.component.css' ]
})
export class SoccerpitchComponent implements OnInit {
	soccerPitchs: Soccerpitch[];

	constructor(public soccerPitchService: SoccerpitchService) {}

	ngOnInit() {
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
}
