import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ReservationModalComponent } from "./components/modal/reservation-modal/reservation-modal.component";
import { AuthService } from "./service/auth.service";
import { CompanyUserService } from "./service/company-user.service";
import { ScheduleService } from "./service/schedule.service";
import { ToastserviceService } from "./service/toastservice.service";

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
    private companyUserService: CompanyUserService,
    private modalService: NgbModal,
    private scheduleService: ScheduleService,
    private toastService: ToastserviceService
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
      error => {
        this.toastService.showError("Erro ao consultar dados. " + error.message);
      }
    );
  }

  private GetUserNotification(){
    this.companyUserService.getUserNotification().subscribe(
      res => {
        this.notifications = res;
      },
      error => {
        this.toastService.showError("Erro ao consultar dados. " + error.message);
      }
    );
  }

  openScheduleInfo(notificationInfo){
    if(notificationInfo){
      if(notificationInfo.data){
        let notificationData = JSON.parse(notificationInfo.data);
          let modalOption : NgbModalOptions = {};
          modalOption.backdrop = "static";
          modalOption.keyboard = false;
          modalOption.ariaLabelledBy = "modal-basic-title";
          const modalRef = this.modalService.open(
            ReservationModalComponent,
            modalOption
          );
          modalRef.result.then(
            (result) => {
            },
            (reason) => {}
          );
          modalRef.componentInstance.reservationId = notificationData.reservationId;
      }
    }
    
  }
}
