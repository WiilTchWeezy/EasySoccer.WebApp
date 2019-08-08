import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
	selector: 'app-add-user-modal',
	templateUrl: './add-user-modal.component.html',
	styleUrls: [ './add-user-modal.component.css' ]
})
export class AddUserModalComponent implements OnInit {
	ngOnInit() {}
	user: User;
	constructor(public activeModal: NgbActiveModal, public userService: UserService) {
		this.user = new User('', '', '', '');
	}
	save() {
		this.userService.createAsync(this.user).subscribe(
			(data) => {
				this.activeModal.close();
			},
			(error) => {}
		);
	}
}
