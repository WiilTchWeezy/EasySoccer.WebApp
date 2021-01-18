import { Component, OnInit } from "@angular/core";
import { AuthService } from "./service/auth.service";
import { CompanyUserService } from "./service/company-user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userName: string = "Usuário";
  notifications: any[];
  ngOnInit(): void {
    this.authService.menuEmitter.subscribe(show => {
      this.showMenu = show;
      if (this.authService.isAuth) {
        this.GetUserInfo();
        this.GetUserNotification();
      }
    });
  }
  constructor(
    private authService: AuthService,
    private companyUserService: CompanyUserService
  ) {}
  title = "app";

  showMenu: boolean = false;

  logout($event) {
    $event.preventDefault();
    this.authService.logOff(true);
  }

  private GetUserInfo() {
    this.companyUserService.getUserInfo().subscribe(
      res => {
        this.userName = res.name;
      },
      error => {}
    );
  }

  private GetUserNotification(){
    this.companyUserService.getUserNotification().subscribe(
      res => {
        this.notifications = res;
      },
      error => {}
    );
  }
}
