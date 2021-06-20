import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  endpoint = environment.urlApi;
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
		let body = res;
		return body || {};
  }
  
  public getPlansInfo(): Observable<any> {
		return this.http.get(environment.urlApi + 'Financial/getPlansInfo').pipe(map(this.extractData));
	}
}
