import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class PersonCompanyService {
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

  public filterAsync(filter: any): Observable<any> {
    if (filter === "") {
      return of([]);
    }
    return this.http
      .get(
        environment.urlApi + "PersonCompany/getAutoComplete?filter=" + filter
      )
      .pipe(map(this.extractData));
  }

  public getAsync(page, pageSize, email, name, phone): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "PersonCompany/get?page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&email=" +
          email +
          "&name=" +
          name +
          "&phone=" +
          phone
      )
      .pipe(map(this.extractData));
  }

  public createAsync(personCompany: any): any {
    return this.http.post<any>(
      environment.urlApi + "PersonCompany/post",
      personCompany
    );
  }

  public updateAsync(personCompany: any) {
    return this.http.post<any>(
      environment.urlApi + "PersonCompany/patch",
      personCompany
    );
  }

  public getPersonInfoAsync(personId: any): Observable<any> {
    return this.http
      .get(environment.urlApi + "PersonCompany/getInfo?Id=" + personId)
      .pipe(map(this.extractData));
  }
}
