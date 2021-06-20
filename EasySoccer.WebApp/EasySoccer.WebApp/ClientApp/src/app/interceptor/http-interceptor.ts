import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { LoaderService } from "../service/loader.service";
import { finalize } from "rxjs/operators";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private loaderService: LoaderService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    var token = this.cookieService.get("token");
    const dupReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token),
    });
    return next.handle(dupReq).pipe(finalize(() => this.loaderService.hide()));
  }
}
