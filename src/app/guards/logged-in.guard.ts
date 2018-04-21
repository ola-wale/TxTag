import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../services/api-service.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(public apiService: ApiService, public router: Router) {}

  canActivate(): boolean {
    if(!this.apiService.isAuthenticated()){
      this.router.navigate(['./auth/login']);
      return false;
    }
    return true;
  }
}
