import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		this.authService.menuEmitter.subscribe((show) => (this.showMenu = show));
	}
	constructor(private authService: AuthService) {}
	title = 'app';

	showMenu: boolean = false;

	logout(){
		this.authService.logOff();
	}
}
