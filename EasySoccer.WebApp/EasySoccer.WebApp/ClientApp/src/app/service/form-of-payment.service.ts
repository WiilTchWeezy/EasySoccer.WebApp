import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class FormOfPaymentService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public getFormOfPaymentsDropDown(): Observable<any> {
    return this.http
      .get(environment.urlApi + "FormOfPayment/getDropDown")
      .pipe(map(this.extractData));
  }

  public getFormOfPayments(page, pageSize): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "FormOfPayment/get?page=" +
          page +
          "&pageSize=" +
          pageSize
      )
      .pipe(map(this.extractData));
  }

  public postFormOfPayment(name, active): any {
    return this.http.post(environment.urlApi + "FormOfPayment/post", {
      Name: name,
      Active: active,
    });
  }
  public patchFormOfPayment(name, active, formOfPaymentId): any {
    return this.http.patch(environment.urlApi + "FormOfPayment/patch", {
      Name: name,
      Active: active,
      FormOfPaymentId: formOfPaymentId,
    });
  }
}
