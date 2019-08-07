import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-add-user-modal',
	templateUrl: './add-user-modal.component.html',
	styleUrls: [ './add-user-modal.component.css' ]
})
export class AddUserModalComponent {
	constructor(public activeModal: NgbActiveModal) {}
}
