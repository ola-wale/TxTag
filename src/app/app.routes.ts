/**
 * Routing
 */
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTagPageComponent } from './dashboard/new-tag-page/new-tag-page.component';
import { TagsPageComponent } from './dashboard/tags-page/tags-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export const routes: Routes = [
  {path:'dashboard',data: { title: 'New Transaction' },canActivate:[LoggedInGuard],component:DashboardComponent,children:[
    {path:'',data: { title: 'New Transaction', alias: 'new' },component:NewTagPageComponent},
    {path:'tags',data: { title: 'Tagged Transactions', alias: 'tagged' },component:TagsPageComponent},
  ]},
  {path:'auth',canActivate:[LoggedOutGuard],component:AuthComponent,children:[
    {path:'',data: { title: 'Sign in | TxTag' },component:LoginComponent},
    {path:'login',data: { title: 'Sign in | TxTag' },component:LoginComponent},
    {path:'signup',data: { title: 'Sign up | TxTag' },component:SignupComponent},
  ]},
  {path: '**', redirectTo: '/dashboard'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
