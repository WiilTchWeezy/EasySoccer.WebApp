import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Login } from "../../model/login";
import { ToastserviceService } from "../../service/toastservice.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  usuario: Login;
  constructor(
    private authService: AuthService,
    private toastService: ToastserviceService
  ) {
    this.usuario = new Login();
  }

  ngOnInit() {}

  authenticate() {
    this.authService.authenticate(this.usuario);
  }
}
