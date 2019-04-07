import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ScheduleService {
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

	public getSchedules(): Observable<any> {
		return this.http.get(environment.urlApi + 'soccerpitchreservation/get').pipe(map(this.extractData));
	}
}
