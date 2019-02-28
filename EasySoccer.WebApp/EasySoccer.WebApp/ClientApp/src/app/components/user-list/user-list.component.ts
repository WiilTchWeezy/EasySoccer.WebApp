import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: [ './user-list.component.css' ]
})
export class UserListComponent implements OnInit {
	@Input() users: User[];
	constructor() {}

	ngOnInit() {}
}
