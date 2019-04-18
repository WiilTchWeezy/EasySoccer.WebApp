import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../service/schedule.service';
import { SoccerPitchReservation } from '../../model/soccer-pitch-reservation';
interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397
	}
];

@Component({
	selector: 'app-myschedule',
	templateUrl: './myschedule.component.html',
	styleUrls: [ './myschedule.component.css' ]
})
export class MyscheduleComponent implements OnInit {
	page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	soccerPitchReservations: SoccerPitchReservation[];

	constructor(public scheduleService: ScheduleService) {}

	ngOnInit() {
		this.scheduleService.getSchedules().subscribe(
			(res) => {
				console.log(res);
				this.soccerPitchReservations = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	get countries(): Country[] {
		return COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize
		);
	}
}
