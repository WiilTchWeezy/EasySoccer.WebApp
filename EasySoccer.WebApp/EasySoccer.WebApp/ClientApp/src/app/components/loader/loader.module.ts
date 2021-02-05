import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
  ],
})
export class LoaderModule {}
