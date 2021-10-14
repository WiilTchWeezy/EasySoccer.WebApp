import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReservationsPaymentService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getReservationPayments(reservationId): Observable<any> {
    return this.http
      .get(environment.urlApi + "Payment/get?reservationId=" + reservationId)
      .pipe(map(this.extractData));
  }
}
