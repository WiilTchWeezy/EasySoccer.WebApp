import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
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

  public filterAsync(filter: any): Observable<any> {
    if (filter === "") {
      return of([]);
    }
    return this.http
      .get(environment.urlApi + "user/get?filter=" + filter)
      .pipe(map(this.extractData));
  }

  public createAsync(user: User): any {
    return this.http.post<User>(environment.urlApi + "user/create", user);
  }
}
