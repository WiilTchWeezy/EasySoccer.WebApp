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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyscheduleComponent } from './components/myschedule/myschedule.component';
import { SoccerpitchComponent } from './components/soccerpitch/soccerpitch.component';
import { SoccerpitchplanComponent } from './components/soccerpitchplan/soccerpitchplan.component';

@NgModule({
	declarations: [ AppComponent, DashboardComponent, UserListComponent, MyscheduleComponent, SoccerpitchComponent, SoccerpitchplanComponent ],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		ChartsModule,
		FormsModule,
		NgbModule.forRoot(),
		BrowserAnimationsModule,
		RouterModule.forRoot([
			{ path: '', component: DashboardComponent, pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'myschedule', component: MyscheduleComponent },
			{ path: 'soccerpitch', component: SoccerpitchComponent }
		]),
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		})
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
