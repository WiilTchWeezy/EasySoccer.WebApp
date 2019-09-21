import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastserviceService } from '../../service/toastservice.service';

@Component({
	selector: 'app-toastcomponent',
	templateUrl: './toastcomponent.component.html',
	styleUrls: [ './toastcomponent.component.css' ],
	host: { '[class.ngb-toasts]': 'true' }
})
export class ToastcomponentComponent implements OnInit {
	constructor(public toastService: ToastserviceService) {}

	ngOnInit() {}

	isTemplate(toast) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
