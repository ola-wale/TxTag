import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api-service.service';
@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(public apiService: ApiService, public router: Router) {}

  canActivate(): boolean {
    if(this.apiService.isAuthenticated()){ //redirect the user to the dashboard if they're logged in
      this.router.navigate(['./dashboard']);
      return false;
    }
    return true;
  }
}
