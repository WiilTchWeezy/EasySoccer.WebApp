import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: [ './user-list.component.css' ]
})
export class UserListComponent implements OnInit {
	@Input() users: User[];
	selectedUser: User;
	constructor(private modalService: NgbModal) {}

	ngOnInit() {}

	openModal(content: any, currentUser: User) {
		this.selectedUser = currentUser;
		this.modalService
			.open(content, { ariaLabelledBy: 'modal-basic-title' })
			.result.then((result) => {}, (reason) => {});
	}
}
