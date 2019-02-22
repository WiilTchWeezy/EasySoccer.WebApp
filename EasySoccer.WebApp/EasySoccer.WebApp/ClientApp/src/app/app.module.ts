import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './service/auth.service';

@NgModule({
	declarations: [ AppComponent, HomeComponent, DashboardComponent ],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot([
			{ path: '', component: HomeComponent, pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent }
		])
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
