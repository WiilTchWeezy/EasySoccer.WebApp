import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../service/schedule.service';
import { SoccerpitchService } from '../../service/soccerpitch.service';
import { UserService } from '../../service/user.service';
import { SoccerPitchReservation } from '../../model/soccer-pitch-reservation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Soccerpitch } from '../../model/soccerpitch';
import { SoccerpitchplanService } from '../../service/soccerpitchplan.service';
import { Soccerpitchplan } from '../../model/soccerpitchplan';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { AddUserModalComponent } from '../modal/add-user-modal/add-user-modal.component';

@Component({
	selector: 'app-myschedule',
	templateUrl: './myschedule.component.html',
	styleUrls: [ './myschedule.component.css' ]
})
export class MyscheduleComponent implements OnInit {
	page = 1;
	pageSize = 10;
	soccerPitchReservations: SoccerPitchReservation[];
	soccerPitchs: Soccerpitch[];
	soccerPitchsPlans: Soccerpitchplan[];
	collectionSize = 0;
	selectedSoccerPitch: Soccerpitch;
	searching = false;
	searchFailed = false;

	modalTitle: String;
	userRespId: String;
	modalSoccerPitchReservation: SoccerPitchReservation;
	model: any;
	selectedDate: any;
	constructor(
		public scheduleService: ScheduleService,
		private modalService: NgbModal,
		public soccerpitchService: SoccerpitchService,
		public soccerpitchplanService: SoccerpitchplanService,
		public userService: UserService
	) {}

	ngOnInit() {
		this.getReservations();
		this.getSoccerPitchs();
	}

	search = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
				this.userService.filterAsync(term).pipe(
					tap(() => (this.searchFailed = false)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					})
				)
			),
			tap(() => (this.searching = false))
		);

	formatter = (x: { name: string }) => x.name;

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

	getSoccerPitchs() {
		this.soccerpitchService.getSoccerPitchs().subscribe(
			(res) => {
				console.log(res);
				this.soccerPitchs = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getPlansBySoccerPitchId(id: any) {
		this.soccerpitchplanService.getSoccerPitchPlanBySoccerPitchId(id).subscribe(
			(res) => {
				console.log(res);
				this.soccerPitchsPlans = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	selectSoccerPitch($event: any) {
		console.log($event);
		this.modalSoccerPitchReservation.soccerPitchId = $event;
		this.getPlansBySoccerPitchId($event);
	}

	selectUser($event: any) {
		console.log($event);
		this.modalSoccerPitchReservation.userId = $event.id;
	}

	openUserModal(content: any) {
		this.modalService.open(AddUserModalComponent).result.then(
			(result) => {
				console.log(result);
				this.modalSoccerPitchReservation.userId = result.id;
			},
			(reason) => {}
		);
	}

	transformData() {
		this.modalSoccerPitchReservation.hourStart =
			this.modalSoccerPitchReservation.selectedHourStart.hour +
			':' +
			this.modalSoccerPitchReservation.selectedHourStart.minute;
		this.modalSoccerPitchReservation.hourEnd =
			this.modalSoccerPitchReservation.selectedHourEnd.hour +
			':' +
			this.modalSoccerPitchReservation.selectedHourEnd.minute;

		this.modalSoccerPitchReservation.selectedDate = new Date(
			this.selectedDate.year,
			this.selectedDate.month - 1,
			this.selectedDate.day
		);
	}

	openModal(content: any, selectedSoccerPitch: SoccerPitchReservation) {
		console.log(selectedSoccerPitch);
		if (selectedSoccerPitch != undefined && selectedSoccerPitch.id != '' && selectedSoccerPitch.id != undefined) {
			this.modalTitle = 'Editar quadra';
			this.modalSoccerPitchReservation = selectedSoccerPitch;
			this.getPlansBySoccerPitchId(selectedSoccerPitch.soccerPitchSoccerPitchPlanId);
		} else {
			this.modalSoccerPitchReservation = new SoccerPitchReservation();
			this.modalTitle = 'Adicionar nova quadra';
		}

		console.log(this.modalSoccerPitchReservation);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.transformData();
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
