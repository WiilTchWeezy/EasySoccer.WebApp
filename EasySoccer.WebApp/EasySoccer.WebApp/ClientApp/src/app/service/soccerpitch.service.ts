import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Soccerpitch } from "../model/soccerpitch";

@Injectable({
  providedIn: "root",
})
export class SoccerpitchService {
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

  public getSoccerPitchs(): Observable<any> {
    return this.http
      .get(environment.urlApi + "soccerpitch/get")
      .pipe(map(this.extractData));
  }

  public postSoccerPitch(plan: Soccerpitch): any {
    return this.http.post<Soccerpitch>(
      environment.urlApi + "soccerpitch/post",
      plan
    );
  }

  public patchSoccerPitch(plan: Soccerpitch): any {
    return this.http.patch<Soccerpitch>(
      environment.urlApi + "soccerpitch/patch",
      plan
    );
  }

  public getSportTypes(): Observable<any> {
    return this.http
      .get(environment.urlApi + "soccerpitch/getsporttypes")
      .pipe(map(this.extractData));
  }

  public postSoccerPitchImage(imageBase64: any, soccerpitchId: Number): any {
    return this.http.post<Soccerpitch>(
      environment.urlApi + "soccerpitch/saveImage",
      {
        ImageBase64: imageBase64,
        SoccerPitchId: soccerpitchId,
      }
    );
  }
}
