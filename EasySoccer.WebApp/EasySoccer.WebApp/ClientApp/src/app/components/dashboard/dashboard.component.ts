import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewDate: Date = new Date();
	closeResult: string;
	constructor(private modalService: NgbModal) {}

	ngOnInit() {
		this.users = new Array<User>();
		this.users.push(new User('22', 'Pedro Henrique', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.users.push(new User('22', 'Joao Paulo', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.users.push(new User('22', 'Joao Rafael', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.users.push(new User('22', 'Edimar Oliveira', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.users.push(new User('22', 'Marcelo ', '991255409', 'tarcisiosouzabr@gmail.com'));

		this.pendingUsers = new Array<User>();
		this.pendingUsers.push(new User('22', 'Pedro R.', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.pendingUsers.push(new User('22', 'Pedro R.', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.pendingUsers.push(new User('22', 'Pedro R.', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.pendingUsers.push(new User('22', 'Eduardo', '991255409', 'tarcisiosouzabr@gmail.com'));
		this.pendingUsers.push(new User('22', 'Pedro R.', '991255409', 'tarcisiosouzabr@gmail.com'));
	}
	users: Array<User>;
	pendingUsers: Array<User>;
	// lineChart
	public lineChartData: Array<any> = [ { data: [ 40, 59, 65, 69, 73, 78, 85 ], label: '' } ];
	public lineChartLabels: Array<any> = [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho' ];
	public lineChartOptions: any = {
		animation: false,
		responsive: true
	};
	public lineChartColours: Array<any> = [
		{
			backgroundColor: 'rgba(22,30,83,0.4)',
			borderColor: 'rgba(22,30,83,1)',
			pointBackgroundColor: 'rgba(255,89,31,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(22,30,83,0.8)'
		}
	];
	public lineChartLegend = false;
	public lineChartType = 'line';

	// events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	open(content: any) {
		console.log('called open');
		console.log(this.modalService);
		console.log(content);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
