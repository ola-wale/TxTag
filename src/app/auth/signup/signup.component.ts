import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  response; //response from our API
  signUpInProgress:boolean;
  constructor(
    private apiService: ApiService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({ //instantiate new FormGroup with FormControls
      email: new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', [
        Validators.required,
        /**
         * Passwords must contain: a minimum of 1 lower case letter [a-z] and;
         * a minimum of 1 upper case letter [A-Z] and; a minimum of 1 numeric character [0-9]
         * and be 6 digits or more
         */
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
      ]),
      confirmPassword: new FormControl(''),
    },PasswordValidation.MatchPassword);
  }

  ngOnInit() {}

  attemptSignup(){
    this.response = '';
    this.signUpInProgress = true;
    this.apiService.signup(this.signupForm.value).then(data => {
      let token = data.token;
      localStorage.setItem('token', token); //store the cookie in localStorage
      this.router.navigateByUrl('dashboard');
      this.response = data;
    })
    .catch(err => {
      this.notificationsService.error('Error', 'An error occurred while trying to sign you up. Please try again later.')
    })
    .then(result => { //finally
      this.signUpInProgress = false;
    })
  }
}

/**
 * Custom password validator class
 */
class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value;
       let confirmPassword = AC.get('confirmPassword').value;
        if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors( { MatchPassword: true } );
        } else {
            return null;
        }
    }
}
