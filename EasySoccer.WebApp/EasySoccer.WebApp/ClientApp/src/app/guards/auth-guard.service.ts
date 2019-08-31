import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (this.authService.isAuth) {
			return true;
		}
		this.router.navigate([ '/login' ]);
		return false;
	}
}
