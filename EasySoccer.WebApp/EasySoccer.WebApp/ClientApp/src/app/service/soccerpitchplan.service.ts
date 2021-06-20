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

	public getSoccerPitchPlanBySoccerPitchId(soccerPitchId: number): Observable<any> {
		return this.http
			.get(environment.urlApi + 'soccerpitchplan/getbysoccerpitch?soccerPitchId=' + soccerPitchId)
			.pipe(map(this.extractData));
	}

	public postSoccerPitchPlan(plan: Soccerpitchplan): any {
		return this.http.post<Soccerpitchplan>(environment.urlApi + 'soccerpitchplan/post', plan);
	}

	public patchSoccerPitchPlan(plan: Soccerpitchplan): any {
		return this.http.patch<Soccerpitchplan>(environment.urlApi + 'soccerpitchplan/patch', plan);
	}
}
