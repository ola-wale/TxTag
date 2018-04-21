import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title}           from '@angular/platform-browser';
import { SignupComponent } from './signup.component';
import { testDependencies } from '../../test.module';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(testDependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('signup form should be invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });
  it('signup form signin button should be disabled when the form is invalid', () => {
    const btn:HTMLElement = fixture.nativeElement.querySelector('input[type="submit"]');
    expect(btn.hasAttribute('disabled')).toBeTruthy();
  });
  it('email field should be invalid with an invalid email address', () => {
    component.signupForm.controls['email'].setValue('d');
    expect(component.signupForm.controls['email'].valid).toBeFalsy();
  });
  it('email field should be valid with a valid email address', () => {
    component.signupForm.controls['email'].setValue('i@owale.co');
    expect(component.signupForm.controls['email'].valid).toBeTruthy();
  });
  it('password field should be invalid with a simple password', () => {
    component.signupForm.controls['password'].setValue('password');
    expect(component.signupForm.controls['password'].valid).toBeFalsy();
  });
  it('password field should be valid with a password with at least 1 number, 1 uppercase letter, 1 lowercase letter', () => {
    component.signupForm.controls['password'].setValue('Password1C');
    expect(component.signupForm.controls['password'].valid).toBeTruthy();
  });
  it('form should be invalid when a valid email and a password is filled in without confirming the password', () => {
    component.signupForm.controls['email'].setValue('i@owale.co');
    component.signupForm.controls['password'].setValue('password123');
    expect(component.signupForm.valid).toBeFalsy();
  });
  it('form should be valid when a valid email,password,and confirmPassword matches password', () => {
    component.signupForm.controls['email'].setValue('i@owale.co');
    component.signupForm.controls['password'].setValue('Password1C');
    component.signupForm.controls['confirmPassword'].setValue('Password1C');
    expect(component.signupForm.valid).toBeTruthy();
  });
});
