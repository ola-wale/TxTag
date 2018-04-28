import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SignupFormInterface } from '../interfaces/signup-form-interface';
import { LoginFormInterface } from '../interfaces/login-form-interface';
import { NewTransactionFormInterface } from '../interfaces/newtransaction-form-interface';
@Injectable()
export class ApiService {
  private backendUrl: String = 'http://dev.owale.co:3000'; //the url to our backend
  private apiVersion = 'v1';
  constructor(private http: HttpClient) { }
  /**
   * Performs a post request to our API to signup with the
   * formdata({email,password,confirmPassword}) as payload
   * @param  formData {SignupFormInterface}
   * @return promise
   */
  signup(formData: SignupFormInterface): Promise<any> {
    return this.http.post(`${this.backendUrl}/private/${this.apiVersion}/auth/signup`, formData).toPromise();
  }
  /**
   * Performs a post request to our API with the
   * formdata({email,password,confirmPassword}) as payload to log the user in
   * @param  formData {SignupFormInterface}
   * @return promise
   */
  login(formData: LoginFormInterface): Promise<any> {
    return this.http.post(`${this.backendUrl}/private/${this.apiVersion}/auth/login`, formData).toPromise();
  }
  /**
   * Fetch the currently authenticated user
   * @return promise
   */
  getUser() {
    return this.http.post(`${this.backendUrl}/private/${this.apiVersion}/auth/user`, {}).toPromise();
  }
  /**
   * Post request to our API with the
   * formdata({hash,tags}) as payload to create a new transaction in our DB
   * @param  formData {NewTransactionFormInterface}
   * @return promise
   */
  newTransaction(formData: NewTransactionFormInterface) {
    return this.http.post(`${this.backendUrl}/private/${this.apiVersion}/transactions`, formData).toPromise();
  }
  /**
   * Get request to our API
   * Fetches Transactions tagged by the current user.
   * @return promise
   */
  transactions() {
    return this.http.get(`${this.backendUrl}/private/${this.apiVersion}/transactions`).toPromise();
  }
  /**
   * Delete request to our API to delete a transaction
   * @param  String {The Id of the transaction to delete}
   * @return promise
   */
  deleteTransaction(transactionId) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: transactionId }
    }
    return this.http.request('DELETE', `${this.backendUrl}/private/${this.apiVersion}/transactions`, options).toPromise();
  }
  /**
   * Is the user logged in?
   * @return boolean true if the user is logged in, false if they aren't
   */
  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (token && !this.jwtIsExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Is the JWT expired?
   * decodes the JWT and compares the current epoch/1000 to
   * the exp in the JWT payload. if the current time > greater than the exp
   * then it's expired
   * @param  token JWT
   * @return boolean true if it's expired, false if it's not
   */
  jwtIsExpired(token): boolean {
    try {
      let splitToken = token.split(".");
      let payload = JSON.parse(atob(splitToken[1]));
      if (Date.now() / 1000 > payload.exp) { //if the token has expired - return true else return false
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return true; //if an exception occurs the token is probably invalid - return true
    }
  }

}
