import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  endpoint = environment.urlApi;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
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

  public getStates(): Observable<any> {
    return this.http
      .get(environment.urlApi + "company/getstates")
      .pipe(map(this.extractData));
  }

  public getCitiesByState(idState: number): Observable<any> {
    return this.http
      .get(environment.urlApi + "company/getcitiesbystate?IdState=" + idState)
      .pipe(map(this.extractData));
  }

  public updateCompanyInfo(
    name,
    description,
    cnpj,
    completeAddress,
    companySchedules,
    longitude,
    latitude,
    idCity,
    insertReservationConfirmed
  ): Observable<any> {
    return this.http
      .patch(environment.urlApi + "company/patchcompanyinfo", {
        name,
        description,
        cnpj,
        completeAddress,
        companySchedules,
        longitude,
        latitude,
        idCity,
        insertReservationConfirmed,
      })
      .pipe(map(this.extractData));
  }

  public postSoccerPitchImage(imageBase64: any): any {
    return this.http.post<any>(environment.urlApi + "company/saveImage", {
      ImageBase64: imageBase64,
    });
  }

  public postActiveCompany(active: boolean): any {
    return this.http.post<any>(environment.urlApi + "company/active", {
      Active: active,
    });
  }
}
