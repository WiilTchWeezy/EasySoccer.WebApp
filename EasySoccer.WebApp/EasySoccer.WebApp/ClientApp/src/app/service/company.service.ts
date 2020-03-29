import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CompanyService {
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

  public getCompanyInfo(): Observable<any> {
    return this.http
      .get(environment.urlApi + "company/getcompanyinfo")
      .pipe(map(this.extractData));
  }

  public updateCompanyInfo(
    name,
    description,
    cnpj,
    completeAddress,
    companySchedules
  ): Observable<any> {
    return this.http
      .patch(environment.urlApi + "company/patchcompanyinfo", {
        name,
        description,
        cnpj,
        completeAddress,
        companySchedules
      })
      .pipe(map(this.extractData));
  }
}
