import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-reservation-list-modal",
  templateUrl: "./reservation-list-modal.component.html",
  styleUrls: ["./reservation-list-modal.component.css"],
})
export class ReservationListModalComponent implements OnInit {
  childReservation: any = {};

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
