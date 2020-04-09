import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthService } from "./service/auth.service";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { UserListComponent } from "./components/user-list/user-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { MyscheduleComponent } from "./components/myschedule/myschedule.component";
import { SoccerpitchComponent } from "./components/soccerpitch/soccerpitch.component";
import { SoccerpitchplanComponent } from "./components/soccerpitchplan/soccerpitchplan.component";
import { AddUserModalComponent } from "./components/modal/add-user-modal/add-user-modal.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { CookieService } from "ngx-cookie-service";
import { CustomHttpInterceptor } from "./interceptor/http-interceptor";
import { ToastcomponentComponent } from "./components/toastcomponent/toastcomponent.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { UserChangePasswordComponent } from "./components/user-change-password/user-change-password.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { CompanyInfoComponent } from "./components/company-info/company-info.component";
import { LoginModalComponent } from "./components/modal/login-modal/login-modal.component";
import { CompanyScheduleComponent } from './components/company-schedule/company-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserListComponent,
    MyscheduleComponent,
    SoccerpitchComponent,
    SoccerpitchplanComponent,
    AddUserModalComponent,
    LoginComponent,
    ToastcomponentComponent,
    UserChangePasswordComponent,
    UserInfoComponent,
    CompanyInfoComponent,
    LoginModalComponent,
    CompanyScheduleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
        canActivate: [AuthGuardService]
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "myschedule",
        component: MyscheduleComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "soccerpitch",
        component: SoccerpitchComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "soccerpitchplan",
        component: SoccerpitchplanComponent,
        canActivate: [AuthGuardService]
      },
      { path: "login", component: LoginComponent },
      {
        path: "changepassword",
        component: UserChangePasswordComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "userinfo",
        component: UserInfoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "companyinfo",
        component: CompanyInfoComponent,
        canActivate: [AuthGuardService]
      }
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddUserModalComponent, LoginModalComponent]
})
export class AppModule {}
