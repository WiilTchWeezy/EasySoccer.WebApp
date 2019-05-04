import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Soccerpitchplan } from '../model/soccerpitchplan';

@Injectable({
	providedIn: 'root'
})
export class SoccerpitchplanService {
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

	public getSoccerPitchPlan(): Observable<any> {
		return this.http.get(environment.urlApi + 'soccerpitchplan/get').pipe(map(this.extractData));
	}

	public postSoccerPitchPlan(plan: Soccerpitchplan): Soccerpitchplan {
		var responseData: Soccerpitchplan;
		this.http.post<Soccerpitchplan>(environment.urlApi + 'soccerpitchplan/get', plan).subscribe(
			(data) => {
				responseData = data;
			},
			(error) => {
				responseData = error;
			}
		);
		return responseData;
	}

	public patchSoccerPitchPlan(plan: Soccerpitchplan): Soccerpitchplan {
		var responseData: Soccerpitchplan;
		this.http.patch<Soccerpitchplan>(environment.urlApi + 'soccerpitchplan/get', plan).subscribe(
			(data) => {
				responseData = data;
			},
			(error) => {
				responseData = error;
			}
		);
		return responseData;
	}
}
