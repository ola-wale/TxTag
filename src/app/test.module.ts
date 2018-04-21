import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { NewTagPageComponent } from './dashboard/new-tag-page/new-tag-page.component';
import { TagsPageComponent } from './dashboard/tags-page/tags-page.component';
import { NewTagPanelComponent } from './dashboard/new-tag-page/new-tag-panel/new-tag-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ApiService } from './services/api-service.service';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { TagsTableComponent } from './dashboard/tags-page/tags-table/tags-table.component';
import { SearchTransactionsPipe } from './search-transactions.pipe';

export let testDependencies ={
  declarations: [
    AppComponent,
    HeaderComponent,
    NewTagPageComponent,
    TagsPageComponent,
    NewTagPanelComponent,
    DashboardComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    TagsTableComponent,
    SearchTransactionsPipe
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    Location,
    ApiService,
    LoggedInGuard,
    LoggedOutGuard
  ]
};
