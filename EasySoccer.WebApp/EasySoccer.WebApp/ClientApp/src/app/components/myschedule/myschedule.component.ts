import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../service/schedule.service';
import { SoccerPitchReservation } from '../../model/soccer-pitch-reservation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

	modalTitle: String;
	modalSoccerPitchReservation: SoccerPitchReservation;

	constructor(public scheduleService: ScheduleService, private modalService: NgbModal) {}

	ngOnInit() {
		this.getReservations();
	}

	getReservations() {
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

	openModal(content: any, selectedSoccerPitch: SoccerPitchReservation) {
		console.log(selectedSoccerPitch);
		if (selectedSoccerPitch.id != '') {
			this.modalTitle = 'Editar quadra';
			this.modalSoccerPitchReservation = selectedSoccerPitch;
		} else {
			this.modalSoccerPitchReservation = new SoccerPitchReservation();
			this.modalTitle = 'Adicionar nova quadra';
		}

		console.log(this.modalSoccerPitchReservation);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				if (selectedSoccerPitch.id != null) {
					this.scheduleService.patchSoccerPitchReservation(this.modalSoccerPitchReservation).subscribe(
						(data) => {
							this.getReservations();
							this.modalSoccerPitchReservation = new SoccerPitchReservation();
						},
						(error) => {}
					);
				} else {
					this.scheduleService.postSoccerPitchReservation(this.modalSoccerPitchReservation).subscribe(
						(data) => {
							this.getReservations();
							this.modalSoccerPitchReservation = new SoccerPitchReservation();
						},
						(error) => {}
					);
				}
			},
			(reason) => {}
		);
	}
}
