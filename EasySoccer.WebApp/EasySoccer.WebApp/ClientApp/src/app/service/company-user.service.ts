import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CompanyUserService {
  endpoint = environment.urlApi;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getUserInfo(): Observable<any> {
    return this.http
      .get(environment.urlApi + "companyuser/getInfo")
      .pipe(map(this.extractData));
  }

  public update(name, email, phone): Observable<any> {
    return this.http
      .patch(environment.urlApi + "companyuser/patch", { name, email, phone })
      .pipe(map(this.extractData));
  }
}
