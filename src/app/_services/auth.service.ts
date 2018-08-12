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

    return this.http.post(
      url,
      JSON.stringify({
        "email": user.email,
        "password": user.password
      }),
      { headers: this.headers }
    );
  }

  socialLogin(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/social-login-user/';

    return this.http.put(
      url,
      JSON.stringify(user),
      { headers: this.headers }
    );
  }

  logout() {
    this._userService.clearCookies();
    this._authRoute.navigate(['login'])
  }

  register(user): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/v1/api-register-user/';

    return this.http.post(
      url,
      JSON.stringify({
        "email": user.email,
        "password": user.password,
        "first_name": user.first_name,
        "second_name": user.second_name,
        "photo": user.photo
      }),
      { headers: this.headers }
    );
  }
}
