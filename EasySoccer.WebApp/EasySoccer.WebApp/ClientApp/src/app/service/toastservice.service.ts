import { Injectable, TemplateRef } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ToastserviceService {
  constructor() {}
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  showSuccess(textOrTpl: string) {
    this.toasts.push({
      textOrTpl,
      ...{ classname: "bg-success text-light", delay: 5000 },
    });
  }

  showError(textOrTpl: string) {
    this.toasts.push({
      textOrTpl,
      ...{ classname: "bg-danger text-light", delay: 5000 },
    });
  }

  showWarnig(textOrTpl: string) {
    this.toasts.push({
      textOrTpl,
      ...{ classname: "bg-warning text-light", delay: 3000 },
    });
  }
}
