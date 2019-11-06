import { Injectable, EventEmitter } from "@angular/core";
import { Login } from "../model/login";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { ToastserviceService } from "../service/toastservice.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  menuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  isAuth: boolean = false;
  endpoint = environment.urlApi;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit(): void {}

  authenticate(login: Login) {
    this.authApi(login.name, login.password).subscribe(
      res => {
        this.cookieService.set("token", res.token);
        this.cookieService.set("expireDate", res.expireDate);
        this.isAuth = true;
        this.menuEmitter.emit(true);
        this.router.navigate(["/"]);
      },
      error => {
        this.toastService.showError("Erro ao realizar login. " + error.message);
        this.isAuth = false;
        this.menuEmitter.emit(false);
        this.router.navigate(["/login"]);
      }
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  authApi(email: string, password: string): Observable<any> {
    return this.httpClient
      .get(
        environment.urlApi +
          "login/tokencompany?email=" +
          email +
          "&password=" +
          password
      )
      .pipe(map(this.extractData));
  }

  checkIsAuth(): boolean {
    let token = this.cookieService.get("token");
    var expireDate = new Date(this.cookieService.get("expireDate"));
    if (
      token != null &&
      token != "" &&
      token != undefined &&
      new Date() < expireDate
    ) {
      this.isAuth = true;
      this.menuEmitter.emit(true);
      return true;
    } else {
      this.isAuth = false;
      this.menuEmitter.emit(false);
      this.logOff();
      return false;
    }
  }

  logOff() {
    this.cookieService.delete("token");
    this.cookieService.delete("expireDate");
    this.isAuth = false;
    this.menuEmitter.emit(false);
    this.router.navigate(["/login"]);
  }
}
