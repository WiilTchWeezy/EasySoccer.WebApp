import { Component, OnInit, Input } from "@angular/core";
import { Reservation } from "../../model/reservation";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DashboardService } from "../../service/dashboard.service";
import { ToastserviceService } from "../../service/toastservice.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  reservations: Reservation[];
  selectedUser: Reservation;
  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private toastService: ToastserviceService
  ) {}

  ngOnInit() {
    this.dashboardService.getReservations().subscribe(
      response => {
        this.reservations = response;
      },
      error => {
        this.toastService.showError(
          "Erro ao consultar dados. " + error.Message
        );
      }
    );
  }

  openModal(content: any, currentUser: Reservation) {
    this.selectedUser = currentUser;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(result => {}, reason => {});
  }
}
