import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { testDependencies } from './test.module';

describe('Routing', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  }));

  it('navigating to the dashboard should redirect /auth/login when the user is not logged in.', fakeAsync(() => {
    router.navigate(['dashboard']);
    tick();
    expect(location.path()).toBe('/auth/login');
  }));

});
