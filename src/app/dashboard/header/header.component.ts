import { Component, OnDestroy, Input } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @Input('user') user; //user input from the parent component
  subscription: ISubscription;
  currentRouteAlias: String;
  constructor(
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private titleService: Title
) {
  this.subscription = this.router.events
  .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      this.currentRouteAlias = event['alias'];
    });
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /**
   * Logs the user out
   * removes the token from localStorage and redirects to the login page.
   * A more secure way to do this is to 'inform' the server to blacklist the JWT
   * till it's expired, so compromised JWTs can't be used after the user is logged out.
   */
  logOut() {
    localStorage.removeItem('token');
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl('/auth/login');
    }
  }

}
