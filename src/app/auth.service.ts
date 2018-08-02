import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private _authRoute: Router) {

  }

  sendToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  getToken() {
    const token = localStorage.getItem("access_token");
    return this.helper.decodeToken(token);
  }

  getExpirationData() {
    const token = localStorage.getItem("access_token");
    return this.helper.getTokenExpirationDate(token);
  }

  isTokenExpired() {
    const token = localStorage.getItem("access_token");
    return this.helper.isTokenExpired(token);
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("access_token");
    this._authRoute.navigate(["login"]);
  }
}
