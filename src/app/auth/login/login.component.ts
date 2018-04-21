import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  response;
  loginInProgress: boolean;

  constructor(private apiService: ApiService, private notificationsService: NotificationsService, private router: Router) {
    this.loginForm = new FormGroup({ //instantiate new FormGroup with FormControls
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() { }

  attemptLogin() {
    this.response = '';
    this.loginInProgress = true;
    this.apiService.login(this.loginForm.value).then(data => { //data should contain JWT token
      this.response = data;
      let token = data.token;
      localStorage.setItem('token', token); //store the cookie in localStorage
      this.router.navigateByUrl('dashboard');
    })
      .catch(err => {
        switch (err.status) {
          case 401:
            this.response = err.error;
            break;
          default:
            this.notificationsService.error('Error', 'An error occurred while trying to log you in. Please try again later.')
            break;
        }
      })
      .then(result => { //finally
        this.loginInProgress = false;
      })
  }

}

class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      return null;
    }
  }
}
