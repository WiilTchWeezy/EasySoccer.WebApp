import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { ToastserviceService } from "../../service/toastservice.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-change-password",
  templateUrl: "./user-change-password.component.html",
  styleUrls: ["./user-change-password.component.css"]
})
export class UserChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  passwordConfirm: string;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private toastService: ToastserviceService,
    private router: Router
  ) {}

  ngOnInit() {}

  changePassword() {
    this.loading = true;
    if (this.newPassword && this.passwordConfirm && this.oldPassword) {
      if (this.passwordConfirm == this.newPassword) {
        this.authService
          .changePassword(this.oldPassword, this.newPassword)
          .subscribe(
            res => {
              this.loading = false;
              this.toastService.showSuccess("Senha alterada com sucesso.");
              this.router.navigate(["/"]);
            },
            error => {
              this.loading = false;
              this.toastService.showError(error.error);
            }
          );
      } else {
        this.toastService.showError("Confirme a senha corretamente");
        this.loading = false;
      }
    }
  }
}
