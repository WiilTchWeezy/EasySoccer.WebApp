import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PlanGenerationConfigService {
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  public getPlanGenerationConfig(page, pageSize): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "PlanGenerationConfig/get?page=" +
          page +
          "&pageSize=" +
          pageSize,
        this.httpOptions
      )
      .pipe(map(this.extractData));
  }

  public postPlanConfig(planConfig) {
    return this.http
      .post(environment.urlApi + "PlanGenerationConfig/post", planConfig)
      .pipe(map(this.extractData));
  }

  public patchPlanConfig(planConfig) {
    return this.http
      .patch(environment.urlApi + "PlanGenerationConfig/patch", planConfig)
      .pipe(map(this.extractData));
  }
}
