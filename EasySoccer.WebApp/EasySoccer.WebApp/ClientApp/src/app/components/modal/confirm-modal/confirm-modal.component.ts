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
        <strong>Tem certeza que deseja sair sem salvar a alteração ? </strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Não Salvar
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-primary"
        (click)="modal.close('Ok click')"
      >
        Salvar
      </button>
    </div>
  `,
})
export class ConfirmModalComponent {
  constructor(public modal: NgbActiveModal) {}
}
