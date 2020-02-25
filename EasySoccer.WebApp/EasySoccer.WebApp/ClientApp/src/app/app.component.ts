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
  ngOnInit(): void {
    this.authService.menuEmitter.subscribe(show => (this.showMenu = show));
    this.companyUserService.getUserInfo().subscribe(
      res => {
        this.userName = res.name;
      },
      error => {}
    );
  }
  constructor(
    private authService: AuthService,
    private companyUserService: CompanyUserService
  ) {}
  title = "app";

  showMenu: boolean = false;

  logout() {
    this.authService.logOff();
  }
}
