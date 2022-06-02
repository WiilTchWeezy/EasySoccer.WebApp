import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-confirm-modal",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">EasySoccer</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ text }} </strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        {{ noText }}
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-primary"
        (click)="modal.close('Ok click')"
      >
        {{ yesText }}
      </button>
    </div>
  `,
})
export class ConfirmModalComponent {
  text: string;
  yesText: string;
  noText: string;
  constructor(public modal: NgbActiveModal) {}
}
