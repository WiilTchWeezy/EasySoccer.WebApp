import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Soccerpitch } from '../model/soccerpitch';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	endpoint = environment.urlApi;
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
	constructor(private http: HttpClient) {}

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	public getReservations(): Observable<any> {
		return this.http.get(environment.urlApi + 'dashboard/reservations').pipe(map(this.extractData));
	}

	public getReservationChart(): Observable<any> {
		return this.http.get(environment.urlApi + 'dashboard/reservationschart').pipe(map(this.extractData));
	}
}
