import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
	selectedDate: any;
	constructor(
		public scheduleService: ScheduleService,
		private modalService: NgbModal,
		public soccerpitchService: SoccerpitchService,
		public soccerpitchplanService: SoccerpitchplanService,
		public userService: UserService
	) {}

	@ViewChild('dp') datePicker: ElementRef;

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
				this.soccerPitchReservations = res.data;
				this.collectionSize = res.total;
				console.log(res);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getSoccerPitchs() {
		this.soccerpitchService.getSoccerPitchs().subscribe(
			(res) => {
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
				this.soccerPitchsPlans = res;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	selectSoccerPitch($event: any) {
		this.modalSoccerPitchReservation.soccerPitchId = $event;
		this.getPlansBySoccerPitchId($event);
	}

	selectUser($event: any) {
		this.modalSoccerPitchReservation.userId = $event.id;
	}

	openUserModal(content: any) {
		this.modalService.open(AddUserModalComponent).result.then(
			(result) => {
				this.modalSoccerPitchReservation.userId = result.id;
				this.modalSoccerPitchReservation.selectedUser = {
					name: result.name + '(' + result.phone + ')',
					id: result.id
				};
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
			this.modalSoccerPitchReservation.userSelectDate.year,
			this.modalSoccerPitchReservation.userSelectDate.month - 1,
			this.modalSoccerPitchReservation.userSelectDate.day
		);
	}
	fitDataToFront() {
		this.modalSoccerPitchReservation.userSelectDate = {
			year: new Date(this.modalSoccerPitchReservation.selectedDate).getFullYear(),
			month: new Date(this.modalSoccerPitchReservation.selectedDate).getMonth() + 1,
			day: new Date(this.modalSoccerPitchReservation.selectedDate).getDate()
		};

		this.modalSoccerPitchReservation.selectedUser = {
			name: this.modalSoccerPitchReservation.userName + '(' + this.modalSoccerPitchReservation.userPhone + ')',
			id: this.modalSoccerPitchReservation.userId
		};
	}

	openModal(content: any, selectedSoccerPitch: SoccerPitchReservation) {
		console.log(selectedSoccerPitch);
		if (selectedSoccerPitch != undefined && selectedSoccerPitch.id != '' && selectedSoccerPitch.id != undefined) {
			this.modalTitle = 'Editar quadra';
			this.modalSoccerPitchReservation = selectedSoccerPitch;
			this.fitDataToFront();
			this.getPlansBySoccerPitchId(selectedSoccerPitch.soccerPitchId);
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
