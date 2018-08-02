import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _authRoute: Router) { }

  sendToken(token: string) {
    localStorage.setItem("logged-in-user", token)
  }

  getToken() {
    return localStorage.getItem("logged-in-user")
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("logged-in-user");
    this._authRoute.navigate(["login"]);
  }
}
