import { Injectable, EventEmitter } from '@angular/core';
import { Login } from '../model/login';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	menuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() {}

	ngOnInit(): void {}

	authentication(login: Login) {
		this.menuEmitter.emit(true);
	}
}
