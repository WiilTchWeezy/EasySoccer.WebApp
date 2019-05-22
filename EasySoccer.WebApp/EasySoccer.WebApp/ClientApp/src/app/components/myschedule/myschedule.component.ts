import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../service/schedule.service';
import { SoccerPitchReservation } from '../../model/soccer-pitch-reservation';
@Component({
	selector: 'app-myschedule',
	templateUrl: './myschedule.component.html',
	styleUrls: [ './myschedule.component.css' ]
})
export class MyscheduleComponent implements OnInit {
	page = 1;
	pageSize = 10;
	soccerPitchReservations: SoccerPitchReservation[];
	collectionSize = 0;

	constructor(public scheduleService: ScheduleService) {}

	ngOnInit() {
		this.scheduleService.getSchedules(this.page, this.pageSize).subscribe(
			(res) => {
				console.log(res);
				this.soccerPitchReservations = res;
				this.collectionSize = this.soccerPitchReservations.length;
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
