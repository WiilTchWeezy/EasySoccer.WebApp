import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { SoccerPitchReservation } from "../model/soccer-pitch-reservation";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
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

  public getSchedules(
    page: number,
    pageSize: number,
    initialDate,
    finalDate,
    soccerPitchId,
    SoccerPitchPlanId,
    userName
  ): Observable<any> {
    let formattedInitialDate = "";
    if (initialDate) {
      formattedInitialDate =
        initialDate.year + "-" + initialDate.month + "-" + initialDate.day;
    }
    let formattedFinalDate = "";
    if (finalDate) {
      formattedFinalDate =
        finalDate.year + "-" + finalDate.month + "-" + finalDate.day;
    }
    if (!soccerPitchId || soccerPitchId == 0) {
      soccerPitchId = "";
    }
    if (!SoccerPitchPlanId || SoccerPitchPlanId == 0) {
      SoccerPitchPlanId = "";
    }
    if (!userName) {
      userName = "";
    }

    return this.http
      .get(
        environment.urlApi +
          "soccerpitchreservation/get?page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&InitialDate=" +
          formattedInitialDate +
          "&FinalDate=" +
          formattedFinalDate +
          "&soccerPitchId=" +
          soccerPitchId +
          "&SoccerPitchPlanId=" +
          SoccerPitchPlanId +
          "&UserName=" +
          userName
      )
      .pipe(map(this.extractData));
  }

  public postSoccerPitchReservation(plan: SoccerPitchReservation): any {
    return this.http.post<SoccerPitchReservation>(
      environment.urlApi + "soccerpitchreservation/post",
      plan
    );
  }

  public patchSoccerPitchReservation(plan: SoccerPitchReservation): any {
    return this.http.patch<SoccerPitchReservation>(
      environment.urlApi + "soccerpitchreservation/patch",
      plan
    );
  }
}
