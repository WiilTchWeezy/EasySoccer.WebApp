import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './service/auth.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
	declarations: [ AppComponent, DashboardComponent, UserListComponent ],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		ChartsModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', component: DashboardComponent, pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent }
		])
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
