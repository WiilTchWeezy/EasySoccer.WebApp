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

  public getReservationPayments(reservationId, status): Observable<any> {
    if (!status || status == 0) {
      status = "";
    }
    return this.http
      .get(
        environment.urlApi +
          "Payment/get?soccerPitchReservationId=" +
          reservationId +
          "&status=" +
          status
      )
      .pipe(map(this.extractData));
  }

  public patchReservationPayment(
    paymentId,
    value,
    personCompanyId,
    note,
    formOfPaymentId
  ): any {
    return this.http.patch(environment.urlApi + "Payment/patch", {
      PaymentId: paymentId,
      Value: value,
      PersonCompanyId: personCompanyId,
      Note: note,
      FormOfPaymentId: formOfPaymentId,
    });
  }

  public postReservationPayment(
    value,
    personCompanyId,
    note,
    formOfPaymentId,
    soccerPitchReservationId
  ): any {
    return this.http.post(environment.urlApi + "Payment/post", {
      Value: value,
      PersonCompanyId: personCompanyId,
      Note: note,
      FormOfPaymentId: formOfPaymentId,
      SoccerPitchReservationId: soccerPitchReservationId,
    });
  }

  public getPaymentsByFilter(
    startDate,
    endDate,
    formOfPayment,
    page,
    pageSize
  ): Observable<any> {
    if (!startDate) {
      startDate = "";
    }
    if (!endDate) {
      endDate = "";
    }
    if (!formOfPayment) {
      formOfPayment = "";
    }
    return this.http
      .get(
        environment.urlApi +
          "Payment/getByFilter?StartDate=" +
          startDate +
          "&EndDate=" +
          endDate +
          "&FormOfPayment=" +
          formOfPayment +
          "&Page=" +
          page +
          "&PageSize=" +
          pageSize
      )
      .pipe(map(this.extractData));
  }

  public cancelPayment(idPayment): any {
    return this.http.post(
      environment.urlApi + "Payment/cancel?idPayment=" + idPayment,
      {}
    );
  }
}
