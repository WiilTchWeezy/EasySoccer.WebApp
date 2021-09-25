import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
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
import { CompanyScheduleComponent } from "./components/company-schedule/company-schedule.component";
import localePTBR from "@angular/common/locales/pt-PT";
import ptBr from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { ConfirmModalComponent } from "./components/modal/confirm-modal/confirm-modal.component";
import { ReservationModalComponent } from "./components/modal/reservation-modal/reservation-modal.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderModule } from "./components/loader/loader.module";
import { NgxLoadingModule } from "ngx-loading";
import { PersonCompanyComponent } from "./components/person-company/person-company.component";
import { PersonCompanyModalComponent } from "./components/modal/person-company-modal/person-company-modal.component";
import { SoccerpitchplanModalComponent } from "./components/modal/soccerpitchplan-modal/soccerpitchplan-modal.component";
import { PlanGenerationConfigComponent } from "./components/plan-generation-config/plan-generation-config.component";
import { PlanGenerationConfigModalComponent } from "./components/modal/plan-generation-config-modal/plan-generation-config-modal.component";
import { ReservationListModalComponent } from "./components/modal/reservation-list-modal/reservation-list-modal.component";

registerLocaleData(ptBr);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

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
    CompanyScheduleComponent,
    ConfirmModalComponent,
    ReservationModalComponent,
    PaymentComponent,
    LoaderComponent,
    PersonCompanyComponent,
    PersonCompanyModalComponent,
    SoccerpitchplanModalComponent,
    PlanGenerationConfigComponent,
    PlanGenerationConfigModalComponent,
    ReservationListModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    LoaderModule,
    RouterModule.forRoot([
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
        canActivate: [AuthGuardService],
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "myschedule",
        component: MyscheduleComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "soccerpitch",
        component: SoccerpitchComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "soccerpitchplan",
        component: SoccerpitchplanComponent,
        canActivate: [AuthGuardService],
      },
      { path: "login", component: LoginComponent },
      {
        path: "changepassword",
        component: UserChangePasswordComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "userinfo",
        component: UserInfoComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "companyinfo",
        component: CompanyInfoComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "payment",
        component: PaymentComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "persons",
        component: PersonCompanyComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "plangenerationconfig",
        component: PlanGenerationConfigComponent,
        canActivate: [AuthGuardService],
      },
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgMultiSelectDropDownModule.forRoot(),
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCi2hnhPwsHYMqTe-CNnAZOaw9Grtt3ESQ",
    }),
    NgxMaskModule.forRoot(),
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
  ],
  providers: [
    AuthService,
    AuthGuardService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR",
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserModalComponent,
    LoginModalComponent,
    ConfirmModalComponent,
    ReservationModalComponent,
    PersonCompanyModalComponent,
    SoccerpitchplanModalComponent,
    PlanGenerationConfigModalComponent,
    ReservationListModalComponent,
  ],
})
export class AppModule {}
