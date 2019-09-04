import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		var token = this.cookieService.get('token');
		const dupReq = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + token)
		});
		return next.handle(dupReq);
	}
}
