import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';

@NgModule({
	imports: [ ChartJSRoutingModule, ChartsModule ],
	declarations: [ DashboardComponent ],
	providers: [],
	bootstrap: [ DashboardComponent ]
})
export class ChartJSModule {}
