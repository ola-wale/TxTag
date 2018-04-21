import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { testDependencies } from '../../test.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('login form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('login form signin button should be disabled when the form is invalid', () => {
    const btn:HTMLElement = fixture.nativeElement.querySelector('input[type="submit"]');
    expect(btn.hasAttribute('disabled')).toBeTruthy();
  });
  it('email field should be invalid with an invalid email address', () => {
    component.loginForm.controls['email'].setValue('d');
    expect(component.loginForm.controls['email'].valid).toBeFalsy();
  });
  it('email field should be valid with a valid email address', () => {
    component.loginForm.controls['email'].setValue('i@owale.co');
    expect(component.loginForm.controls['email'].valid).toBeTruthy();
  });
  it('form should be valid when a valid email and a password is filled in', () => {
    component.loginForm.controls['email'].setValue('i@owale.co');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
