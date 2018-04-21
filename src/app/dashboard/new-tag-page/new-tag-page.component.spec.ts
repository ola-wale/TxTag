import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagPageComponent } from './new-tag-page.component';
import { testDependencies } from '../../test.module';

describe('NewTagPageComponent', () => {
  let component: NewTagPageComponent;
  let fixture: ComponentFixture<NewTagPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
