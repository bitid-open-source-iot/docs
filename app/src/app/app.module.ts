/* --- PIPES --- */
import { ScopesPipe } from './pipes/scopes.pipe';

/* --- PAGES --- */
import { RouteComponent } from './pages/route/route.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { VersionComponent } from './pages/version/version.component';
import { ProjectComponent } from './pages/project/project.component';
import { EndpointComponent } from './pages/endpoint/endpoint.component';
import { ProjectsComponent } from './pages/projects/projects.component';

/* --- MODULES --- */
import {
	MatIconModule,
	MatListModule,
	MatInputModule,
	MatSelectModule,
	MatButtonModule,
	MatRippleModule,
	MatToolbarModule,
	MatGridListModule,
	MatFormFieldModule,
	MatProgressBarModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { MenuService } from './services/menu/menu.service';
import { AuthManager } from './services/auth/auth.manager';
import { AuthService } from './services/auth/auth.service';
import { ProjectsService } from './services/projects/projects.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { DocumentationService } from './services/documentation/documentation.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';
import { BackButtonDirective } from './directives/back-button.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ScopesPipe,
		AppComponent,
		RouteComponent,
		SigninComponent,
		SignupComponent,
		VerifyComponent,
		VersionComponent,
		ProjectComponent,
		VersionComponent,
		ProjectsComponent,
		EndpointComponent,
		BackButtonDirective,
	],
	imports: [
		OrderModule,
		MatIconModule,
		MatListModule,
		BrowserModule,
		MatInputModule,
		MatSelectModule,
		MatRippleModule,
		MatButtonModule,
		AppRoutingModule,
		HttpClientModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatGridListModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		BrowserAnimationsModule
	],
	providers: [
		ApiService,
		MenuService,
		AuthManager,
		AuthService,
		ProjectsService,
		FormErrorService,
		LocalstorageService,
		DocumentationService
	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule {}