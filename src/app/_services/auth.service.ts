import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private _authRoute: Router,
    private http: HttpClient,
    private _userService: UserService,
  ) { }

  login(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/api-login-user/';

    console.log('inside-login-in-auth');

    return this.http.post(
      url,
      JSON.stringify({
        "email": user.email,
        "password": user.password
      }),
      { headers: this.headers }
    );
  }

  logout() {
    this._userService.clearCookies();
    this._authRoute.navigate(['login'])
  }

  register(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/api-register-user/';
    
    console.log('inside-register-auth');

    let httpParams = new HttpParams()
      .append("email", user.email)
      .append("password", user.password)
      .append("first_name", user.first_name)
      .append("second_name", user.second_name)
      .append("photo", user.photo)

    return this.http.post(
      url,
      { httpParams },
      { headers: this.headers }
    );
  }
}
