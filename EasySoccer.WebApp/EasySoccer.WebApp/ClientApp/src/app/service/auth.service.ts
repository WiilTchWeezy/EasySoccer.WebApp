import { Injectable, EventEmitter } from '@angular/core';
import { Login } from '../model/login';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	menuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
	isAuth: boolean = false;
	constructor(private router: Router) {}

	ngOnInit(): void {}

	authenticate(login: Login) {
		this.isAuth = true;
		this.menuEmitter.emit(true);
		this.router.navigate([ '/' ]);
	}
}
