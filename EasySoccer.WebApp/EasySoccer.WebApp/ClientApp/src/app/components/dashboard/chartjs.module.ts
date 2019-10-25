import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts/ng2-charts";

import { ChartJSRoutingModule } from "./chartjs-routing.module";

@NgModule({
  imports: [ChartJSRoutingModule, ChartsModule],
  declarations: [],
  providers: [],
  bootstrap: []
})
export class ChartJSModule {}
